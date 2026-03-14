'use client';

import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import { commonClasses, socialMedia, 
  siteInfo, envConfig, externalLinkAttributes } from "@/app/lib/constants";

export default function Contact() {
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!envConfig.emailjs.serviceId || !envConfig.emailjs.templateId 
      || !envConfig.emailjs.userId) {
      Swal.fire({
        icon: 'error',
        title: 'Configuration error',
        text: 'Email service is not configured.',
      });
      return;
    }
    emailjs.sendForm(envConfig.emailjs.serviceId, 
      envConfig.emailjs.templateId, e.target, { 
        publicKey: envConfig.emailjs.userId }).then(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Message Sent Successfully',
        });
        e.target.reset();
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops, something went wrong',
          text: error.text,
        });
      }
    );
  };

  return (
    <div className="container mx-auto">
      <div className={commonClasses.pageHeader}>
        <strong>Contact</strong>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className={commonClasses.bodyText}>
          <p>
            If you have any questions, comments, or concerns, please feel free to reach out to us on social media.
            <br />
            <a href={socialMedia.bluesky} {...externalLinkAttributes}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Bluesky_Logo.svg"
                alt={`${siteInfo.name} on Bluesky`}
                className="w-[5%] min-w-[32px] inline mr-5 grayscale contrast-200 brightness-200"
              />
            </a>
            <a href={socialMedia.heycafe} {...externalLinkAttributes}>
              <img
                src="https://assets.heycafecdn.com/logos/svg/logo_round_transparent_purple.svg?cache=wqn4mia5vlfugr4"
                alt={`${siteInfo.name} on Hey.Café`}
                className="w-[5%] min-w-[32px] inline mr-5 grayscale contrast-200 invert"
              />
            </a>
            <a href={socialMedia.eh} {...externalLinkAttributes}>
              <img
                src="https://dp-assets.tor1.digitaloceanspaces.com/socials/Eh-Logo.svg"
                alt={`${siteInfo.name} on Eh!`}
                className="w-[5%] min-w-[32px] inline mr-5 grayscale contrast-200 invert"
              />
            </a>
            <br /><br />
            Additionally, feel free to contact me via email through the form on this page.
          </p>
        </div>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="from_name" className={commonClasses.formLabel}>
              <strong>Your Name</strong>
            </label>
            <input
              id="from_name"
              type="text"
              name="from_name"
              placeholder="Your Name"
              className={commonClasses.formInput}
            />
          </div>
          <div>
            <label htmlFor="from_email" className={commonClasses.formLabel}>
              <strong>Email Address</strong>
            </label>
            <input
              id="from_email"
              type="email"
              name="from_email"
              placeholder="Enter email"
              className={commonClasses.formInput}
            />
          </div>
          <div>
            <label htmlFor="subject" className={commonClasses.formLabel}>
              <strong>Subject</strong>
            </label>
            <input
              id="subject"
              type="text"
              name="subject"
              placeholder="Enter Subject"
              className={commonClasses.formInput}
            />
          </div>
          <div>
            <label htmlFor="message" className={commonClasses.formLabel}>
              <strong>Message</strong>
            </label>
            <textarea
              id="message"
              name="message"
              rows={10}
              className={commonClasses.formInput}
            />
          </div>
          <button type="submit" className={commonClasses.formButton}>Submit</button>
        </form>
      </div>
    </div>
  );
}
