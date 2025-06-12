import React from 'react';
import { Linkedin, Instagram, Github } from "lucide-react";

const MemberCard = ({ member, screenSize }) => {
  const getCardStyles = () => {
    switch (screenSize) {
      case 'mobile':
        return {
          container: "w-90 h-[26rem] flex-shrink-0 flex flex-col items-center justify-center px-4",
          card: "relative w-72 h-[22rem] bg-purple-900/20 rounded-3xl shadow-2xl border border-purple-400/30 overflow-hidden transform transition-all duration-300 hover:shadow-purple-500/25",
          imageContainer: "p-5",
          image: "w-full h-52 object-cover rounded-2xl border border-purple-400/50 transition-all duration-300",
          info: "px-5 pb-5 text-center",
          name: "font-bold text-purple-300 mb-3 text-lg leading-tight",
          post: "text-purple-400 mb-4 text-base opacity-90",
          socialSpacing: "space-x-5",
          iconSize: "w-6 h-6"
        };
      case 'tablet':
        return {
          container: "w-80 h-[24rem] flex-shrink-0 flex flex-col items-center justify-center px-6",
          card: "relative w-60 h-[21rem] bg-purple-900/20 rounded-3xl shadow-2xl border border-purple-400/30 overflow-hidden transform transition-all duration-300 hover:shadow-purple-500/25",
          imageContainer: "p-4",
          image: "w-full h-44 object-cover rounded-2xl border border-purple-400/50 transition-all duration-300",
          info: "px-4 pb-4 text-center",
          name: "font-bold text-purple-300 mb-2 text-base leading-tight",
          post: "text-purple-400 mb-3 text-sm opacity-90",
          socialSpacing: "space-x-4",
          iconSize: "w-5 h-5"
        };
      default: // desktop
        return {
          container: "w-85 h-[26rem] flex-shrink-0 flex flex-col items-center justify-center px-6",
          card: "relative w-64 h-[22rem] bg-purple-900/20 rounded-3xl shadow-2xl border border-purple-400/30 overflow-hidden transform transition-all duration-500 hover:shadow-purple-500/25",
          imageContainer: "p-5",
          image: "w-full h-48 object-cover rounded-2xl border border-purple-400/50 transition-all duration-300",
          info: "px-5 pb-5 text-center",
          name: "font-bold text-purple-300 mb-3 text-lg leading-tight",
          post: "text-purple-400 mb-4 text-base opacity-90",
          socialSpacing: "space-x-4",
          iconSize: "w-6 h-6"
        };
    }
  };

  const styles = getCardStyles();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <img
            src={member.photo}
            alt={member.name}
            className={styles.image}
          />
        </div>
        
        <div className={styles.info}>
          <h3 
            className={styles.name}
            style={{ fontFamily: "Orbitron, monospace" }}
          >
            {member.name}
          </h3>
          <p 
            className={styles.post}
            style={{ fontFamily: "Orbitron, monospace" }}
          >
            {member.post}
          </p>
          
          <div className="flex justify-center space-x-4">
            <a
              href={`https://linkedin.com/in/${member.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-all duration-200"
            >
              <Linkedin className={styles.iconSize} />
            </a>
            <a
              href={`https://instagram.com/${member.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-all duration-200"
            >
              <Instagram className={styles.iconSize} />
            </a>
            <a
              href={`https://github.com/${member.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-all duration-200"
            >
              <Github className={styles.iconSize} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;