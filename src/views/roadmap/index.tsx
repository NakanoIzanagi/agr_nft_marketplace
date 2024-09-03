// Next, React
import { FC, useEffect, useState } from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { roadmapData } from './roadmapdata';
import { motion } from 'framer-motion';
import Image from 'next/image';
export const RoadmapView: FC = ({ }) => {

  return (

    <div className="flex flex-col items-center  mt-10 px-6 py-12 pb-40 xl:w-[1000px]   bg-gradient-to-b from-transparent via-black/50 to-black/20">

      <div className="container px-4 mx-auto">
        <motion.h2
          className="mb-12 text-5xl font-bold text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Roadmap
        </motion.h2>
        <VerticalTimeline>
          {roadmapData.map((item) => (
            <VerticalTimelineElement
              key={item.id}
              contentStyle={{
                background: '#192c1a',
                color: '#fff',
                borderRadius: '8px',
                boxShadow: '0 3px 8px rgba(0, 0, 0, 0.3)',
                backgroundopacity:0.3
              }}
              contentArrowStyle={{ borderRight: '7px solid  #192c1a' }}
              date={item.date}
              iconStyle={{
                background: '#192c1a',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              icon={
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={70}
                  height={70}
                />
              }
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-2xl font-semibold text-center">{item.title}</h3>
                <p className="mt-2 text-gray-300">{item.description}</p>
              </motion.div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
};
