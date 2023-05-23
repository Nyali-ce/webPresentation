import './index.scss';
import { motion } from 'framer-motion';

function Index() {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            >
            <p className="authorDescription">
                I'm a backend developer based in Canada.
            </p>
        </motion.div>
    )
}

export default Index