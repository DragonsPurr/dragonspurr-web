import {
  buildCustomerAvatarObjectKey,
  buildPublicObjectUrl,
  extensionForAvatarMime,
  isAllowedAvatarObjectKey,
} from '@/app/lib/customer-avatar';
import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

function getOvhS3Config() {
  const endpoint = process.env.OVH_USER_ASSETS_S3_ENDPOINT?.trim();
  const bucket = process.env.OVH_USER_ASSETS_S3_BUCKET?.trim();
  const region = process.env.OVH_USER_ASSETS_S3_REGION?.trim() || 'ca-east-tor';
  const accessKeyId = process.env.OVH_USER_ASSETS_S3_ACCESS_KEY?.trim();
  const secretAccessKey = process.env.OVH_USER_ASSETS_S3_SECRET_KEY?.trim();

  return { endpoint, bucket, region, accessKeyId, secretAccessKey };
}

export function isOvhUserAssetsConfigured(): boolean {
  const { endpoint, bucket, accessKeyId, secretAccessKey } = getOvhS3Config();
  return Boolean(endpoint && bucket && accessKeyId && secretAccessKey);
}

function getOvhS3Client(): S3Client {
  const { endpoint, region, accessKeyId, secretAccessKey } = getOvhS3Config();
  if (!endpoint || !accessKeyId || !secretAccessKey) {
    throw new Error('OVH user assets storage is not configured.');
  }

  return new S3Client({
    region,
    endpoint,
    credentials: { accessKeyId, secretAccessKey },
    forcePathStyle: false,
  });
}

export async function uploadCustomerAvatarToOvh(
  customerId: string,
  body: Uint8Array,
  contentType: string
): Promise<string> {
  const { bucket } = getOvhS3Config();
  if (!bucket) {
    throw new Error('OVH user assets bucket is not configured.');
  }

  const extension = extensionForAvatarMime(contentType);
  if (!extension) {
    throw new Error('Unsupported image type.');
  }

  const key = buildCustomerAvatarObjectKey(customerId, extension);
  const client = getOvhS3Client();

  const putInput = {
    Bucket: bucket,
    Key: key,
    Body: body,
    ContentType: contentType,
    CacheControl: 'public, max-age=31536000, immutable',
  };

  try {
    await client.send(new PutObjectCommand({ ...putInput, ACL: 'public-read' }));
  } catch {
    await client.send(new PutObjectCommand(putInput));
  }

  return buildPublicObjectUrl(key);
}

export async function getOvhUserAsset(
  objectKey: string
): Promise<{ body: Uint8Array; contentType: string }> {
  if (!isAllowedAvatarObjectKey(objectKey)) {
    throw new Error('Invalid object key.');
  }

  const { bucket } = getOvhS3Config();
  if (!bucket) {
    throw new Error('OVH user assets bucket is not configured.');
  }

  const client = getOvhS3Client();
  const response = await client.send(
    new GetObjectCommand({
      Bucket: bucket,
      Key: objectKey,
    })
  );

  if (!response.Body) {
    throw new Error('Object not found.');
  }

  const bytes = await response.Body.transformToByteArray();
  return {
    body: bytes,
    contentType: response.ContentType ?? 'application/octet-stream',
  };
}
