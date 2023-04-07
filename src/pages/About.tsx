import './about.scss';
import { motion } from 'framer-motion';

function About() {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            >
            <div className='aboutSection'>
                <h1 className='aboutTitle'>About Me</h1>
                <p className='aboutDescription'>
                I'm a 17-year-old programmer who has a passion for backend development and programming languages like JavaScript, TypeScript, C, Python, and Java. My interest in programming began when I was just 13 years old, and I have been developing my skills ever since.
                I loves working on the backend of applications, creating systems and APIs that handle the heavy lifting and data management of web and mobile applications. I enjoy using JavaScript and TypeScript to create scalable and efficient systems, as well as C, Python, and Java to tackle more complex problems.
                I always try to keep up with the latest trends and technologies. I am also an avid gamer and I love to play strategy games that challenge my critical thinking and problem-solving skills.
                I'm always seeking new challenges and opportunities to improve my skills and knowledge in the world of programming. I am a driven and dedicated programmer who is constantly looking for ways to make a positive impact on the world through my work.
                </p>
            </div>
        </motion.div>
    )
}

export default About