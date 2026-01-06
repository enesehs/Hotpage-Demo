import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, Download, RefreshCw } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const VideoShowcase: React.FC = () => {
    const { t } = useLanguage();
    const [activeVideo, setActiveVideo] = useState(0);
    const [progress, setProgress] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    const videos = [
        {
            id: 'install',
            title: t.videoShowcase.videos.install.title,
            description: t.videoShowcase.videos.install.description,
            duration: '0:23',
            icon: Download,
            placeholderColor: 'bg-indigo-500/20',
        },
        {
            id: 'customization',
            title: t.videoShowcase.videos.customization.title,
            description: t.videoShowcase.videos.customization.description,
            duration: '1:03',
            icon: Settings,
            placeholderColor: 'bg-purple-500/20',
        },
        {
            id: 'sync-sticky',
            title: t.videoShowcase.videos.sync.title,
            description: t.videoShowcase.videos.sync.description,
            duration: '1:32',
            icon: RefreshCw,
            placeholderColor: 'bg-cyan-500/20',
        },
    ];

    const handleVideoEnded = () => {
        setActiveVideo((prev) => (prev + 1) % videos.length);
        setProgress(0);
    };

    const handleTimeUpdate = () => {
        if (videoRef.current && videoRef.current.duration > 0) {
            setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
        }
    };

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
            videoRef.current.play().catch(() => {
                // Ignore autoplay errors (usuallly interaction related)
            });
        }
    }, [activeVideo]);

    return (
        <section className="py-24 px-4">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">
                        {t.videoShowcase.title}
                    </h2>
                    <p className="text-xl text-gray-400 font-light">
                        {t.videoShowcase.subtitle}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Video Player Main Area */}
                    <div className="md:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl shadow-indigo-500/10 group"
                        >
                            {/* Placeholder for actual video */}
                            {/* Video Player */}
                            <video
                                ref={videoRef}
                                src={`${import.meta.env.BASE_URL}videos/${videos[activeVideo].id}.mp4`}
                                muted
                                playsInline
                                preload="auto"
                                onEnded={handleVideoEnded}
                                onTimeUpdate={handleTimeUpdate}
                                className="w-full h-full object-cover"
                            />

                            {/* Overlay for text readability if needed */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                            <div className="absolute bottom-6 left-6 right-6 z-20">
                                <h3 className="font-heading text-2xl font-bold text-white mb-1 shadow-black/50 drop-shadow-md">
                                    {videos[activeVideo].title}
                                </h3>
                            </div>

                            {/* Browser Frame Decor (Mac style dots) */}
                            <div className="absolute top-4 left-4 flex gap-2 z-10">
                                <div className="w-3 h-3 rounded-full bg-red-500/80 backdrop-blur-sm" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80 backdrop-blur-sm" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80 backdrop-blur-sm" />
                            </div>
                        </motion.div>
                    </div>

                    {/* Playlist / Sidebar */}
                    <div className="space-y-4">
                        {videos.map((video, index) => (
                            <button
                                key={video.id}
                                onClick={() => setActiveVideo(index)}
                                className={`relative w-full text-left p-6 rounded-2xl border transition-all duration-300 flex items-start gap-4 group backdrop-blur-sm overflow-hidden ${activeVideo === index
                                    ? 'bg-white/10 border-white/20 shadow-lg'
                                    : 'bg-white/5 border-transparent hover:bg-white/10'
                                    }`}
                            >
                                {/* Progress Bar Background for Active Item */}
                                {activeVideo === index && (
                                    <div className="absolute bottom-0 left-0 h-1 bg-white/10 w-full z-0">
                                        <motion.div
                                            className="h-full bg-indigo-300"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                            transition={{ ease: "linear", duration: 0.25 }}
                                        />
                                    </div>
                                )}

                                <div className={`relative z-10 p-3 rounded-xl bg-white/5 ${activeVideo === index ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                                    <video.icon size={24} />
                                </div>
                                <div className="relative z-10 flex-1">
                                    <h4 className={`font-heading font-semibold text-lg mb-1 ${activeVideo === index ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                                        {video.title}
                                    </h4>
                                    <p className="text-sm text-gray-500 leading-relaxed mb-2">
                                        {video.description}
                                    </p>
                                    <span className="text-xs font-mono text-blue-300 uppercase tracking-wider">
                                        {video.duration}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
