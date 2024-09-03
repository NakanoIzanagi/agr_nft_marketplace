// Next, React
import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
export const TeamView: FC = ({ }) => {
  const teamMembers = [
    {
      name: 'Mario Mclaughlin',
      role: 'CEO',
      imageUrl: '/ceo_photo.png', // Replace with actual image path
      introduction: 'Founder & C.E.O, Agriculture Research and Organization',
      contact: {
        email: 'john.doe@example.com',
        linkedIn: 'https://www.linkedin.com/in/johndoe/',
        twitter: 'https://twitter.com/johndoe',
      },
    },
    {
      name: 'Nakano Izanagi',
      role: 'CTO',
      imageUrl: '/cto_photo.png', // Replace with actual image path
      introduction: 'C.T.O, Agriculture Research and Organization',
      contact: {
        email: 'nakano951225@gmail.com',
        linkedIn: 'https://www.linkedin.com/in/janesmith/',
        twitter: 'https://twitter.com/janesmith',
      },
    },
  ];
  return (

    <div className="flex flex-col items-center  mt-10 px-6 py-12 pb-40 xl:w-[1000px]  bg-gradient-to-b from-transparent via-black/50 to-black/20">
      <div className="container px-6 mx-auto text-center">
        <h1 className="mb-12 text-5xl font-bold">Meet Our Team</h1>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {teamMembers.map((member, index) => (
            <div key={index} className="p-8 transition-transform transform bg-[#172018] bg-opacity-70 rounded-lg shadow-lg hover:scale-105">
              <Image
                src={member.imageUrl}
                alt={member.name}
                width={200}
                height={200}
                className="mx-auto mb-6 rounded-full"
              />
              <h2 className="text-2xl font-bold">{member.name}</h2>
              <p className="mb-4 text-xl text-blue-400">{member.role}</p>
              <p className="mb-6 text-gray-300">{member.introduction}</p>
              <div className="flex justify-center space-x-6">
                <a href={`mailto:${member.contact.email}`} className="text-blue-500 hover:text-blue-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4C2.89 4 2 .89 2 2v20l4-4h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 12H6.83L4 18.17V6h16v10z" />
                  </svg>
                </a>
                <a href={member.contact.linkedIn} className="text-blue-500 hover:text-blue-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0H5C2.2 0 0 2.2 0 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5V5c0-2.8-2.2-5-5-5zM8.5 20.4H5.3v-9.8h3.2v9.8zm-1.6-11.3c-1 0-1.7-.8-1.7-1.7S5.9 5.7 7 5.7c1 0 1.7.8 1.7 1.7s-.7 1.7-1.7 1.7zm12.4 11.3h-3.2v-4.9c0-1.2-.4-2-1.4-2.3-.6-.2-1.3-.1-1.9.2v7.1H8.5v-9.8h3.1v1.3h.1c.5-.8 1.6-1.4 2.6-1.4 2 0 3.5 1.6 3.5 4.3v5.6h.1z" />
                  </svg>
                </a>
                <a href={member.contact.twitter} className="text-blue-500 hover:text-blue-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.6c-.9.4-1.8.7-2.8.9.1.5.1 1.1.1 1.7 0 4.9-3.7 10.6-10.6 10.6-2.1 0-4-.6-5.6-1.7.3 0 .6.1.9.1 1.8 0 3.4-.6 4.7-1.6-1.6 0-3-1-3.5-2.3.2 0 .4.1.6.1.3 0 .6 0 .8-.1-1.7-.3-3-1.8-3-3.5v-.1c.5.3 1.1.5 1.7.6-.8-.5-1.3-1.4-1.3-2.3 0-.5.1-.9.3-1.3 1.8 2.1 4.4 3.5 7.4 3.7-.1-.2-.1-.4-.1-.6 0-1.6 1.3-2.9 2.9-2.9.8 0 1.5.3 2.1.8.7-.1 1.4-.4 2-.8-.2.7-.7 1.3-1.4 1.7.6-.1 1.2-.2 1.8-.5-.4.6-1 1.1-1.6 1.6z" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
