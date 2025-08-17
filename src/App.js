import React, { useState, useEffect, useRef } from 'react';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState("");
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  const wishes = [
    "Wishing you a day filled with joy and laughter!",
    "May your year be as wonderful as you are!",
    "Hope your birthday is as amazing as you've made my days!",
    "Sending you the biggest smile on your special day!",
    "May all your dreams come true this year!"
  ];

  const photos = [
    process.env.PUBLIC_URL + "/1.png",
    process.env.PUBLIC_URL + "/2.png",
    process.env.PUBLIC_URL + "/3.png",
    process.env.PUBLIC_URL + "/4.png",
    process.env.PUBLIC_URL + "/5.png"
  ];

  const funFacts = [
    { fact: "You have the best laugh that can cheer anyone up", emoji: "😄" },
    { fact: "Your presence alone can turn an ordinary moment into magic", emoji: "✨" },
    { fact: "Your voice has a calming effect, like a warm hug ", emoji: "🤗" },
    { fact: "You give the best advice during tough times", emoji: "💡" },
    { fact: "You don’t just dream — you inspire others to dream too", emoji: "😇" },
    { fact: "Every dance of yours tells a story — and it’s always beautiful", emoji: "💃" }
  ];

  const memories = [
    { title: "First Meet", date: "2020", description: "Our first conversation in the college library" },
    { title: "Movie Night", date: "2021", description: "That hilarious horror movie that scared us both" },
    { title: "Trip to Hills", date: "2022", description: "The road trip where we got lost but found amazing views" },
    { title: "Exam Support", date: "2023", description: "Studying together during those tough semesters" }
  ];

  // Floating particles
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newParticles = [];
      for (let i = 0; i < 5; i++) {
        newParticles.push({
          id: Date.now() + i,
          x: Math.random() * 100,
          y: 100,
          type: ['🎈', '🎉', '🎁', '✨', '🎊'][Math.floor(Math.random() * 5)],
          size: Math.random() * 20 + 10,
          duration: Math.random() * 10 + 15,
          delay: Math.random() * 5
        });
      }
      setParticles(prev => [...prev.slice(-15), ...newParticles]);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % wishes.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [wishes.length]);

  const addConfetti = (e) => {
    const colors = ['#FFB6C1', '#E8B4CB', '#FF7F7F', '#FFF8DC'];
    const types = ['✨', '🎉', '🎈', '🎊', '🎁', '❤'];

    for (let i = 0; i < 10; i++) {
      const confetti = document.createElement('div');
      confetti.innerHTML = types[Math.floor(Math.random() * types.length)];
      confetti.style.position = 'fixed';
      confetti.style.left = `${e.clientX}px`;
      confetti.style.top = `${e.clientY}px`;
      confetti.style.fontSize = `${Math.random() * 20 + 15}px`;
      confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.transform = 'translate(-50%, -50%)';
      confetti.style.zIndex = '1000';
      confetti.style.pointerEvents = 'none';

      const angle = Math.random() * 360;
      const distance = Math.random() * 100 + 50;
      const duration = Math.random() * 2 + 1;

      confetti.style.animation = `confetti-${Date.now()}-${i} ${duration}s ease-out forwards`;

      document.body.appendChild(confetti);

      const style = document.createElement('style');
      style.textContent = `
        @keyframes confetti-${Date.now()}-${i} {
          0% { transform: translate(-50%, -50%) rotate(0deg); opacity: 1; }
          100% { transform: translate(-50%, -50%) translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) rotate(${angle * 5}deg); opacity: 0; }
        }
      `;
      document.head.appendChild(style);

      setTimeout(() => {
        document.body.removeChild(confetti);
        document.head.removeChild(style);
      }, duration * 1000);
    }
  };

  // Audio player effect
  useEffect(() => {
    if (!audioRef.current) return;

    // Set initial properties
    audioRef.current.volume = 0.5;
    audioRef.current.loop = true;
    audioRef.current.muted = isMuted;

    // Function to handle user interaction
    const handleUserInteraction = () => {
      if (isPlaying && audioRef.current) {
        console.log("Attempting to play audio after user interaction");
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Successfully started playing
              console.log("Audio started playing successfully");
              // We keep the event listeners active to handle potential browser interruptions
            })
            .catch(error => {
              console.error("Play failed despite user interaction:", error);
            });
        }
      }
    };

    // Add event listeners for user interaction
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    // Try to play immediately
    if (isPlaying) {
      console.log("Attempting initial audio play");
      audioRef.current.play().catch(error => {
        console.error("Auto-play was prevented, waiting for user interaction:", error);
        // We'll rely on the event listeners to start playback after user interaction
      });
    } else {
      audioRef.current.pause();
    }

    // Cleanup function
    return () => {
      console.log("Cleaning up audio event listeners");
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [isPlaying, isMuted]);

  return (
    <div
      className={`min-h-screen transition-all duration-700 ${darkMode ? 'bg-gray-900 text-pink-100' : 'bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100'}`}
      onClick={addConfetti}
    >
      <audio
        ref={audioRef}
        src={process.env.PUBLIC_URL + "/Happy Birthday Srushti Song.mp3"}
        preload="auto"
        autoPlay={true}
        loop={true}
        controls={false}
        muted={isMuted}
      />
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        @keyframes slideIn {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .floating {
          animation: float 6s ease-in-out infinite;
        }
        .pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        .slide-in {
          animation: slideIn 1s ease-out;
        }
      `}</style>

      {/* Floating Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="fixed pointer-events-none animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            fontSize: `${particle.size}px`,
            animation: `float ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
            transform: 'translate(-50%, 100%)'
          }}
        >
          {particle.type}
        </div>
      ))}

      {/* Header */}
      <header className={`fixed w-full z-50 transition-all duration-500 backdrop-blur-md ${darkMode ? 'bg-gray-800/90 text-white' : 'bg-white/80 text-pink-800'}`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🎂</span>
              <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                Birthday Celebration
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  setIsMuted(!isMuted);
                  if (audioRef.current) {
                    audioRef.current.muted = !isMuted;
                  }
                }}
                className={`p-2 rounded-full transition-all duration-300 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-pink-100 hover:bg-pink-200'
                  }`}
              >
                {isMuted ? '🔇' : '🔊'}
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full transition-all duration-300 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-pink-100 hover:bg-pink-200'
                  }`}
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className={`absolute inset-0 transition-all duration-1000 ${darkMode
          ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900'
          : 'bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200'
          }`}>
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="2" fill="#FFB6C1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#pattern)" />
            </svg>
          </div>
        </div>

        <div className="text-center z-10 px-6 relative">
          <div className="mb-8">
            <h2 className={`text-6xl md:text-8xl font-bold mb-4 bg-clip-text text-transparent ${darkMode
              ? 'bg-gradient-to-r from-pink-400 via-rose-400 to-pink-300'
              : 'bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600'
              }`}>
              HAPPY
            </h2>
            <h2 className={`text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent ${darkMode
              ? 'bg-gradient-to-r from-rose-400 via-pink-400 to-rose-300'
              : 'bg-gradient-to-r from-rose-500 via-pink-600 to-rose-600'
              }`}>
              BIRTHDAY
            </h2>
            <h3 className={`text-4xl md:text-6xl font-bold mb-8 ${darkMode ? 'text-pink-300' : 'text-rose-600'
              }`}>
              ❤️ SRUSHTI ❤️
            </h3>
          </div>

          <div className="mb-12">
            <p className={`text-xl md:text-2xl max-w-2xl mx-auto mb-8 ${darkMode ? 'text-pink-200' : 'text-gray-700'
              } leading-relaxed`}>
              Celebrating an incredible person on their special day
            </p>

            {/* Srushti's Photo */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 mx-auto mt-8 mb-12">
              <img
                src={process.env.PUBLIC_URL + "/profile.png"}
                alt="Srushti"
                className="w-full h-full object-cover rounded-full shadow-lg border-4 border-pink-300"
                onError={(e) => {
                  console.error("Image failed to load", e);
                  e.target.src = process.env.PUBLIC_URL + "/srushti_org.png";
                }}
              />
            </div>
          </div>

        </div>
      </section>

      {/* Birthday Wishes Section */}
      <section className={`py-24 transition-all duration-500 ${darkMode ? 'bg-gray-900' : 'bg-white'
        }`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-5xl font-bold mb-6 bg-clip-text text-transparent ${darkMode
              ? 'bg-gradient-to-r from-pink-400 to-rose-400'
              : 'bg-gradient-to-r from-pink-500 to-rose-500'
              }`}>
              Special Wishes
            </h2>
            <p className={`text-xl ${darkMode ? 'text-pink-200' : 'text-gray-600'}`}>
              Heartfelt messages for your special day
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className={`rounded-3xl p-12 relative overflow-hidden ${darkMode
              ? 'bg-gradient-to-r from-gray-800 to-purple-900 shadow-2xl'
              : 'bg-gradient-to-r from-pink-50 to-rose-50 shadow-2xl'
              }`}>
              <div className="absolute top-4 right-4 text-4xl opacity-20">✨</div>
              <div className="absolute bottom-4 left-4 text-4xl opacity-20">🎉</div>

              <p className={`text-3xl md:text-4xl text-center leading-relaxed font-light ${darkMode ? 'text-pink-100' : 'text-gray-800'
                }`}>
                {wishes[currentMessage]}
              </p>

              <div className="flex justify-center mt-8 space-x-2">
                {wishes.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentMessage
                      ? (darkMode ? 'bg-pink-400 w-8' : 'bg-pink-500 w-8')
                      : (darkMode ? 'bg-pink-700' : 'bg-pink-300')
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className={`py-24 transition-all duration-500 ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-pink-50 to-rose-50'
        }`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-5xl font-bold mb-6 bg-clip-text text-transparent ${darkMode
              ? 'bg-gradient-to-r from-pink-400 to-rose-400'
              : 'bg-gradient-to-r from-pink-500 to-rose-500'
              }`}>
              The Best of You
            </h2>
            <p className={`text-xl ${darkMode ? 'text-pink-200' : 'text-gray-600'}`}>
              Cherished memories shared
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="relative">
              <div className="overflow-hidden rounded-3xl shadow-2xl">
                <div
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {photos.map((photo, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                      <div className="aspect-[4/3] relative group">
                        <img
                          src={photo}
                          alt={`Memory ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-white font-semibold text-lg">
                            {['College Days', 'Adventure Trip', 'Birthday Party', 'Coffee Meetup', 'Festival Celebration'][index]}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setCurrentSlide(prev => prev === 0 ? photos.length - 1 : prev - 1)}
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${darkMode
                  ? 'bg-gray-800/80 hover:bg-gray-700 text-pink-300'
                  : 'bg-white/80 hover:bg-white text-pink-600'
                  } shadow-lg`}
              >
                ←
              </button>
              <button
                onClick={() => setCurrentSlide(prev => prev === photos.length - 1 ? 0 : prev + 1)}
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${darkMode
                  ? 'bg-gray-800/80 hover:bg-gray-700 text-pink-300'
                  : 'bg-white/80 hover:bg-white text-pink-600'
                  } shadow-lg`}
              >
                →
              </button>

              <div className="flex justify-center mt-8 space-x-3">
                {photos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                      ? (darkMode ? 'bg-pink-400 w-8' : 'bg-pink-500 w-8')
                      : (darkMode ? 'bg-pink-700 hover:bg-pink-600' : 'bg-pink-300 hover:bg-pink-400')
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fun Facts Section */}
      <section className={`py-24 transition-all duration-500 ${darkMode ? 'bg-gray-900' : 'bg-white'
        }`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-5xl font-bold mb-6 bg-clip-text text-transparent ${darkMode
              ? 'bg-gradient-to-r from-pink-400 to-rose-400'
              : 'bg-gradient-to-r from-pink-500 to-rose-500'
              }`}>
              Why You’re So Special
            </h2>
            <p className={`text-xl ${darkMode ? 'text-pink-200' : 'text-gray-600'}`}>
              Things I love about you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {funFacts.map((fact, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 flex items-center space-x-6 transform hover:scale-105 transition-all duration-300 ${darkMode
                  ? 'bg-gradient-to-r from-gray-800 to-purple-900 shadow-xl'
                  : 'bg-gradient-to-r from-pink-50 to-rose-50 shadow-xl'
                  }`}
              >
                <div className="text-4xl flex-shrink-0">{fact.emoji}</div>
                <p className={`text-xl ${darkMode ? 'text-pink-100' : 'text-gray-800'
                  }`}>
                  {fact.fact}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Gift Section */}
      <section className={`py-24 transition-all duration-500 ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-pink-50 to-rose-50'
        }`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-5xl font-bold mb-6 bg-clip-text text-transparent ${darkMode
              ? 'bg-gradient-to-r from-pink-400 to-rose-400'
              : 'bg-gradient-to-r from-pink-500 to-rose-500'
              }`}>
              Your Gift
            </h2>
            <p className={`text-xl ${darkMode ? 'text-pink-200' : 'text-gray-600'}`}>
              A little something from me to you
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className={`rounded-3xl overflow-hidden shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
              <div className="aspect-square bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">🎁</div>
                  <h3 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-pink-200' : 'text-gray-800'
                    }`}>
                    Amazon Gift Card
                  </h3>
                  <p className={`text-lg ${darkMode ? 'text-pink-300' : 'text-gray-600'
                    }`}>
                    For you to choose something special
                  </p>
                </div>
              </div>
              <div className="p-8">
                <div className={`p-6 rounded-2xl mb-6 ${darkMode
                  ? 'bg-gray-700'
                  : 'bg-gradient-to-r from-pink-50 to-rose-50'
                  }`}>
                  <h4 className={`font-bold text-lg mb-3 ${darkMode ? 'text-pink-200' : 'text-gray-800'
                    }`}>
                    How to Redeem:
                  </h4>
                  <ol className={`space-y-2 ${darkMode ? 'text-pink-200' : 'text-gray-700'
                    }`}>
                    <li>1. Visit{" "}
                      <a
                        href="https://www.amazon.in/apay-products/gc/claim"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono bg-pink-100 text-pink-700 px-2 py-1 rounded hover:bg-pink-200 transition-colors break-all"
                      >
                        https://www.amazon.in/apay-products/gc/claim
                      </a></li>
                    <li>2. Enter the gift card code</li>
                    <li>3. Choose anything you love!</li>
                  </ol>
                </div>

                <div className={`p-4 rounded-xl text-center ${darkMode
                  ? 'bg-gradient-to-r from-pink-900/50 to-rose-900/50 text-pink-200'
                  : 'bg-gradient-to-r from-pink-100 to-rose-100 text-pink-800'
                  }`}>
                  <p className="font-mono text-lg">GIFT-CODE-1234-ABCD</p>
                  <p className="text-sm mt-2">* This is a demo code. Actual code will be shared on Whatsapp *</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Memory Highlights */}
      {/*
      <section className={`py-24 transition-all duration-500 ${darkMode ? 'bg-gray-900' : 'bg-white'
        }`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-5xl font-bold mb-6 bg-clip-text text-transparent ${darkMode
              ? 'bg-gradient-to-r from-pink-400 to-rose-400'
              : 'bg-gradient-to-r from-pink-500 to-rose-500'
              }`}>
              Special Moments
            </h2>
            <p className={`text-xl ${darkMode ? 'text-pink-200' : 'text-gray-600'}`}>
              Highlights from our friendship
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {memories.map((memory, index) => (
              <div
                key={index}
                className={`rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300 ${darkMode
                  ? 'bg-gradient-to-b from-gray-800 to-purple-900 shadow-xl'
                  : 'bg-gradient-to-b from-pink-50 to-rose-50 shadow-xl'
                  }`}
              >
                <div className={`text-2xl mb-3 ${['😄', '🎬', '⛰️', '📚'][index]
                  }`}></div>
                <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-pink-200' : 'text-gray-800'
                  }`}>
                  {memory.title}
                </h3>
                <p className={`text-sm mb-2 ${darkMode ? 'text-pink-400' : 'text-rose-600'
                  }`}>
                  {memory.date}
                </p>
                <p className={`text-sm ${darkMode ? 'text-pink-300' : 'text-gray-600'
                  }`}>
                  {memory.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* Video Section */}
      {/*
      <section className={`py-24 transition-all duration-500 ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-pink-50 to-rose-50'
        }`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-5xl font-bold mb-6 bg-clip-text text-transparent ${darkMode
              ? 'bg-gradient-to-r from-pink-400 to-rose-400'
              : 'bg-gradient-to-r from-pink-500 to-rose-500'
              }`}>
              Birthday Video
            </h2>
            <p className={`text-xl ${darkMode ? 'text-pink-200' : 'text-gray-600'}`}>
              A special message for your special day
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://placehold.co/800x450/FFB6C1/white?text=Birthday+Message"
                alt="Birthday video"
                className="w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`w-24 h-24 rounded-full flex items-center justify-center backdrop-blur-sm shadow-xl transform hover:scale-110 transition-all duration-300 ${darkMode ? 'bg-pink-900/50' : 'bg-pink-500/70'
                    }`}
                >
                  {isPlaying ? (
                    <svg className="w-12 h-12 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-12 h-12 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {isPlaying && (
              <div className="mt-6 text-center">
                <div className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold ${darkMode
                  ? 'bg-pink-900/50 text-pink-300'
                  : 'bg-pink-100 text-pink-700'
                  }`}>
                  🎵 Happy Birthday Song Playing 💖
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      */}

      {/* Birthday Quiz */}
      {/*}
      <section className={`py-24 transition-all duration-500 ${darkMode ? 'bg-gray-900' : 'bg-white'
        }`} onClick={addConfetti}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-5xl font-bold mb-6 bg-clip-text text-transparent ${darkMode
              ? 'bg-gradient-to-r from-pink-400 to-rose-400'
              : 'bg-gradient-to-r from-pink-500 to-rose-500'
              }`}>
              Birthday Quiz
            </h2>
            <p className={`text-xl ${darkMode ? 'text-pink-200' : 'text-gray-600'}`}>
              Test your birthday knowledge!
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className={`rounded-3xl p-8 ${darkMode
              ? 'bg-gradient-to-r from-gray-800 to-purple-900 shadow-2xl'
              : 'bg-gradient-to-r from-pink-50 to-rose-50 shadow-2xl'
              }`}>
              <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-pink-200' : 'text-gray-800'
                }`}>
                What's Your Birthday Personality?
              </h3>

              <div className="space-y-6">
                <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-white'
                  }`}>
                  <h4 className={`font-bold mb-2 ${darkMode ? 'text-pink-200' : 'text-gray-800'
                    }`}>
                    1. Your ideal birthday activity:
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button className={`p-3 rounded-lg text-left ${darkMode
                      ? 'bg-gray-600 hover:bg-gray-500'
                      : 'bg-pink-100 hover:bg-pink-200'
                      }`}>
                      🎉 Party with friends
                    </button>
                    <button className={`p-3 rounded-lg text-left ${darkMode
                      ? 'bg-gray-600 hover:bg-gray-500'
                      : 'bg-pink-100 hover:bg-pink-200'
                      }`}>
                      🍕 Quiet dinner
                    </button>
                  </div>
                </div>

                <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-white'
                  }`}>
                  <h4 className={`font-bold mb-2 ${darkMode ? 'text-pink-200' : 'text-gray-800'
                    }`}>
                    2. Your birthday dessert preference:
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button className={`p-3 rounded-lg text-left ${darkMode
                      ? 'bg-gray-600 hover:bg-gray-500'
                      : 'bg-pink-100 hover:bg-pink-200'
                      }`}>
                      🍰 Classic cake
                    </button>
                    <button className={`p-3 rounded-lg text-left ${darkMode
                      ? 'bg-gray-600 hover:bg-gray-500'
                      : 'bg-pink-100 hover:bg-pink-200'
                      }`}>
                      🍫 Chocolate fondue
                    </button>
                  </div>
                </div>

                <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-white'
                  }`}>
                  <h4 className={`font-bold mb-2 ${darkMode ? 'text-pink-200' : 'text-gray-800'
                    }`}>
                    3. Your birthday wish:
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button className={`p-3 rounded-lg text-left ${darkMode
                      ? 'bg-gray-600 hover:bg-gray-500'
                      : 'bg-pink-100 hover:bg-pink-200'
                      }`}>
                      ✨ More adventures
                    </button>
                    <button className={`p-3 rounded-lg text-left ${darkMode
                      ? 'bg-gray-600 hover:bg-gray-500'
                      : 'bg-pink-100 hover:bg-pink-200'
                      }`}>
                      🌿 Peace and calm
                    </button>
                  </div>
                </div>
              </div>

              <button className={`w-full mt-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${darkMode
                ? 'bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white'
                : 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white'
                }`}>
                See Your Results! 🎁
              </button>
            </div>
          </div>
        </div>
      </section>
      */}

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={lightboxImage}
              alt="Enlarged"
              className="max-w-full max-h-full object-contain rounded-2xl"
            />
            <button
              className="absolute top-6 right-6 text-white text-4xl hover:text-pink-300 transition-colors"
              onClick={() => setLightboxOpen(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer
        className={`py-16 transition-all duration-500 ${darkMode ? 'bg-gray-900 text-pink-200' : 'bg-white text-pink-800'
          }`}
      >
        <div className="container mx-auto px-6 text-center">
          <div className="mb-8">
            <h3 className={`text-3xl font-bold mb-4 ${darkMode
              ? 'bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent'
              : 'bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent'
              }`}>
              Happy Birthday Srushti!
            </h3>
            <p className="text-lg">Wishing you a day as wonderful as you are</p>
          </div>

          <div className="flex justify-center space-x-8 text-3xl mb-8">
            <div className="hover:scale-110 transition-transform">🎂</div>
            <div className="hover:scale-110 transition-transform">🎁</div>
            <div className="hover:scale-110 transition-transform">🎉</div>
          </div>

          <div className="pt-8 border-t border-pink-200/30">
            <p className="text-sm opacity-75">
              Click anywhere for a surprise! ✨
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;