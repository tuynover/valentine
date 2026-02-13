import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Music, Image as ImageIcon, Sparkles, Gift } from 'lucide-react';
// 1. Những tấm ảnh đặc biệt (có caption riêng)
const SPECIAL_MEMORIES = [
  { id: 's1', src: '/images/beauty1.jpg', text: "Vẻ đẹp khiến anh say đắm..." },
  { id: 's2', src: '/images/funny.jpg', text: "Sự đáng yêu khiến anh cười cả ngày..." },
  { id: 's3', src: '/images/muse.jpg', text: "Nàng thơ của cuộc đời anh..." },
  { id: 's4', src: '/images/night.jpg', text: "Dù là đêm tối, em vẫn toả sáng..." },
];

// 2. Tự động thêm các ảnh khác (img1.jpg, img2.jpg...)
// 👉 SỬA SỐ DƯỚI ĐÂY thành số lượng ảnh img... bạn đang có
const TOTAL_OTHER_IMAGES = 8; 

const OTHER_MEMORIES = Array.from({ length: TOTAL_OTHER_IMAGES }, (_, i) => ({
  id: `o${i}`,
  src: `/images/img${i + 1}.jpg`, // Nó sẽ tự tìm img1.jpg, img2.jpg...
  text: "ANh yêu em rất nhiều" // Caption chung cho các ảnh này
}));

// Gộp tất cả lại
const MEMORIES = [...SPECIAL_MEMORIES, ...OTHER_MEMORIES];

export default function App() {
  const [stage, setStage] = useState('intro'); // intro, question, gallery, letter
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });

  // Hiệu ứng pháo hoa tim khi hoàn thành
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

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  // Logic nút "Không" chạy trốn
  const moveNoButton = () => {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    setNoButtonPos({ x, y });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-pink-100 to-pink-200 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Hiệu ứng tim bay nền */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-love opacity-20"
            initial={{ y: '100vh', x: Math.random() * 100 + 'vw' }}
            animate={{ y: '-10vh' }}
            transition={{ 
              duration: Math.random() * 5 + 5, 
              repeat: Infinity, 
              delay: Math.random() * 5 
            }}
          >
            <Heart size={Math.random() * 30 + 10} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode='wait'>
        
        {/* --- GIAI ĐOẠN 1: INTRO --- */}
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
            <h1 className="text-4xl title-font text-love font-bold mb-2">Gửi Phương Thảo</h1>
            <p className="text-gray-600">Có một món quà đặc biệt dành cho em...</p>
            <p className="text-sm text-pink-500 mt-2">(Chạm để mở)</p>
          </motion.div>
        )}

        {/* --- GIAI ĐOẠN 2: CÂU HỎI --- */}
        {stage === 'question' && (
          <motion.div
            key="question"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl max-w-md w-full text-center z-10 border border-pink-200"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Một câu hỏi nhỏ nè...</h2>
            <p className="text-xl text-love mb-8 font-medium">Em có yêu anh Tuyn không?</p>
            
            <div className="flex justify-center gap-4 relative h-16">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setStage('gallery')}
                className="bg-love text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-red-600 transition-colors z-20"
              >
                Dạ có ạ! ❤️
              </motion.button>
              
              <motion.button
                animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                onMouseEnter={moveNoButton}
                onClick={moveNoButton} // Cho mobile
                className="bg-gray-300 text-gray-600 px-8 py-3 rounded-full font-bold absolute"
                style={{ left: '60%' }} // Vị trí ban đầu
              >
                Không thèm 😝
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* --- GIAI ĐOẠN 3: THƯ VIỆN ẢNH --- */}
        {stage === 'gallery' && (
          <GalleryView onFinish={() => setStage('letter')} />
        )}

        {/* --- GIAI ĐOẠN 4: LÁ THƯ & KẾT THÚC --- */}
        {stage === 'letter' && (
          <motion.div
            key="letter"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onAnimationComplete={fireConfetti}
            className="bg-white p-6 rounded-3xl shadow-2xl max-w-lg w-full z-10 mx-4 relative overflow-hidden border-2 border-love"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-400 to-love"></div>
            
            <div className="text-center mb-6">
              <h1 className="title-font text-4xl text-love mb-2">Happy Valentine's!</h1>
              <p className="text-gray-400 text-sm">14.02.2026</p>
            </div>

            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-6 shadow-inner group">
              <img 
                src="/images/us.jpg" 
                alt="Couple" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4">
                <p className="text-white font-medium text-center">Chúng mình đẹp đôi nhỉ? 😉</p>
              </div>
            </div>

            <div className="prose prose-pink text-gray-700 mb-6 text-justify px-2 leading-relaxed">
              <p>
                Gửi <b>Phưn Thảo</b> của anh,
              </p>
              <p>
                Cảm ơn em vì đã xuất hiện và làm cho thế giới của anh trở nên rực rỡ sắc màu hí hí. 
                Anh đã cố gắng để nói rằng: Anh yêu em rất nhiều!
              </p>
              <p>
                Mong rằng nụ cười của em sẽ luôn toả nắng như trong những bức ảnh kia. Yêu em bé nhìu! ❤️
              </p>
              <p className="text-right font-bold mt-4 text-love">- Công Tuyền -</p>
            </div>
            
            <div className="text-center">
                <button onClick={() => window.location.reload()} className="text-xs text-gray-400 hover:text-love underline">
                    Xem lại từ đầu
                </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Component con: Hiển thị Gallery dạng trượt
function GalleryView({ onFinish }) {
  const [index, setIndex] = useState(0);

  const nextImage = () => {
    if (index < MEMORIES.length - 1) {
      setIndex(index + 1);
    } else {
      onFinish();
    }
  };

  return (
    <motion.div
      key="gallery"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center w-full max-w-md z-10 px-4"
    >
      <h2 className="title-font text-3xl text-love mb-6 text-center">Những khoảnh khắc...</h2>
      
      <div className="relative w-full aspect-[3/4] bg-white rounded-2xl shadow-2xl p-3 mb-6 rotate-1">
        <AnimatePresence mode='wait'>
            <motion.div
                key={index}
                initial={{ x: 100, opacity: 0, rotate: 5 }}
                animate={{ x: 0, opacity: 1, rotate: 0 }}
                exit={{ x: -100, opacity: 0, rotate: -5 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full relative rounded-xl overflow-hidden cursor-pointer"
                onClick={nextImage}
            >
                <img 
                    src={MEMORIES[index].src} 
                    alt="Memory" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-black/50 p-4 text-white text-center backdrop-blur-sm">
                    <p className="font-medium text-lg">{MEMORIES[index].text}</p>
                    <p className="text-xs text-gray-300 mt-1">(Chạm để xem tiếp)</p>
                </div>
            </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-2">
        {MEMORIES.map((_, i) => (
            <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === index ? 'w-8 bg-love' : 'w-2 bg-pink-200'}`} />
        ))}
      </div>
    </motion.div>
  );
}