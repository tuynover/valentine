import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Gift } from 'lucide-react';

// ===== IMPORT ẢNH =====
import beauty1 from './assets/images/beauty1.jpg';
import funny from './assets/images/funny.jpg';
import muse from './assets/images/muse.jpg';
import night from './assets/images/night.jpg';
import us from './assets/images/us.jpg';

import img1 from './assets/images/img1.jpg';
import img2 from './assets/images/img2.jpg';
import img3 from './assets/images/img3.jpg';
import img4 from './assets/images/img4.jpg';
import img5 from './assets/images/img5.jpg';
import img6 from './assets/images/img6.jpg';
import img7 from './assets/images/img7.jpg';
import img8 from './assets/images/img8.jpg';

// ===== DATA ẢNH =====
const SPECIAL_MEMORIES = [
  { id: 's1', src: beauty1, text: "Vẻ đẹp khiến anh say đắm..." },
  { id: 's2', src: funny, text: "Sự đáng yêu khiến anh cười cả ngày..." },
  { id: 's3', src: muse, text: "Nàng thơ của cuộc đời anh..." },
  { id: 's4', src: night, text: "Dù là đêm tối, em vẫn toả sáng..." },
];

const OTHER_MEMORIES = [
  { id: 'o1', src: img1, text: "Anh yêu em rất nhiều" },
  { id: 'o2', src: img2, text: "Anh yêu em rất nhiều" },
  { id: 'o3', src: img3, text: "Anh yêu em rất nhiều" },
  { id: 'o4', src: img4, text: "Anh yêu em rất nhiều" },
  { id: 'o5', src: img5, text: "Anh yêu em rất nhiều" },
  { id: 'o6', src: img6, text: "Anh yêu em rất nhiều" },
  { id: 'o7', src: img7, text: "Anh yêu em rất nhiều" },
  { id: 'o8', src: img8, text: "Anh yêu em rất nhiều" },
];

const MEMORIES = [...SPECIAL_MEMORIES, ...OTHER_MEMORIES];

export default function App() {
  const [stage, setStage] = useState('intro');
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });

  const fireConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff4d6d', '#ff8fa3']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff4d6d', '#ff8fa3']
      });

      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  const moveNoButton = () => {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    setNoButtonPos({ x, y });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-pink-100 to-pink-200 flex items-center justify-center p-4 overflow-hidden relative">

      {/* TIM BAY */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-love opacity-20"
            initial={{ y: '100vh', x: Math.random() * 100 + 'vw' }}
            animate={{ y: '-10vh' }}
            transition={{ duration: Math.random() * 5 + 5, repeat: Infinity }}
          >
            <Heart size={Math.random() * 30 + 10} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode='wait'>

        {/* INTRO */}
        {stage === 'intro' && (
          <motion.div
            key="intro"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="text-center cursor-pointer z-10"
            onClick={() => setStage('question')}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="bg-white p-8 rounded-full shadow-2xl border-4 border-love mb-6 inline-block"
            >
              <Gift size={64} className="text-love" />
            </motion.div>
            <h1 className="text-4xl title-font text-love font-bold mb-2">
              Gửi Phương Thảo
            </h1>
            <p className="text-gray-600">Có một món quà đặc biệt dành cho em...</p>
            <p className="text-sm text-pink-500 mt-2">(Chạm để mở)</p>
          </motion.div>
        )}

        {/* QUESTION */}
        {stage === 'question' && (
          <motion.div
            key="question"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl max-w-md w-full text-center z-10 border border-pink-200"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Một câu hỏi nhỏ nè...
            </h2>
            <p className="text-xl text-love mb-8 font-medium">
              Em có yêu anh Tuyn không?
            </p>

            <div className="flex justify-center gap-4 relative h-16">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setStage('gallery')}
                className="bg-love text-white px-8 py-3 rounded-full font-bold shadow-lg"
              >
                Dạ có ạ! ❤️
              </motion.button>

              <motion.button
                animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                onMouseEnter={moveNoButton}
                onClick={moveNoButton}
                className="bg-gray-300 text-gray-600 px-8 py-3 rounded-full font-bold absolute"
                style={{ left: '60%' }}
              >
                Không thèm 😝
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* GALLERY */}
        {stage === 'gallery' && (
          <GalleryView onFinish={() => setStage('letter')} />
        )}

        {/* LETTER */}
        {stage === 'letter' && (
          <motion.div
            key="letter"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onAnimationComplete={fireConfetti}
            className="bg-white p-6 rounded-3xl shadow-2xl max-w-lg w-full z-10 mx-4 border-2 border-love"
          >
            <h1 className="text-4xl text-love mb-4 text-center">
              Happy Valentine's!
            </h1>

            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-6 shadow-inner">
              <img
                src={us}
                alt="Couple"
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-gray-700 text-justify">
              Cảm ơn em vì đã xuất hiện và làm cho thế giới của anh trở nên rực rỡ.
              Anh yêu em rất nhiều ❤️
            </p>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

function GalleryView({ onFinish }) {
  const [index, setIndex] = useState(0);

  const nextImage = () => {
    if (index < MEMORIES.length - 1) setIndex(index + 1);
    else onFinish();
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md z-10 px-4">
      <h2 className="text-3xl text-love mb-6">Những khoảnh khắc...</h2>

      <div
        className="relative w-full aspect-[3/4] bg-white rounded-2xl shadow-2xl p-3 mb-6 cursor-pointer"
        onClick={nextImage}
      >
        <img
          src={MEMORIES[index].src}
          alt="Memory"
          className="w-full h-full object-cover rounded-xl"
        />
        <div className="absolute bottom-0 inset-x-0 bg-black/50 p-4 text-white text-center">
          {MEMORIES[index].text}
        </div>
      </div>
    </div>
  );
}
