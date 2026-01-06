import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

type LegalType = 'privacy' | 'terms' | null;

interface LegalModalProps {
    type: LegalType;
    onClose: () => void;
}

// Markdown to JSX renderer
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
    const processInline = (text: string): React.ReactNode[] => {
        const parts: React.ReactNode[] = [];
        let lastIndex = 0;
        const regex = /(\*\*(.*?)\*\*|\[(.*?)\]\((.*?)\))/g;
        let match;

        while ((match = regex.exec(text)) !== null) {
            if (match.index > lastIndex) {
                parts.push(text.slice(lastIndex, match.index));
            }

            if (match[0].startsWith('**')) {
                parts.push(<strong key={match.index} className="text-white font-semibold">{match[2]}</strong>);
            } else {
                parts.push(
                    <a
                        key={match.index}
                        href={match[4]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 underline transition-colors"
                    >
                        {match[3]}
                    </a>
                );
            }
            lastIndex = regex.lastIndex;
        }

        if (lastIndex < text.length) {
            parts.push(text.slice(lastIndex));
        }

        return parts.length > 0 ? parts : [text];
    };

    return (
        <div className="space-y-3 text-gray-300 text-sm leading-relaxed">
            {content.split('\n').map((line, i) => {
                const trimmedLine = line.trim();
                if (!trimmedLine) return <div key={i} className="h-2" />;

                if (trimmedLine.startsWith('# ')) {
                    return <h1 key={i} className="text-2xl font-bold text-white mb-4 mt-2">{trimmedLine.replace('# ', '')}</h1>;
                }
                if (trimmedLine.startsWith('## ')) {
                    return <h2 key={i} className="text-lg font-bold text-white mt-6 mb-3 border-b border-white/10 pb-2">{trimmedLine.replace('## ', '')}</h2>;
                }
                if (trimmedLine.startsWith('### ')) {
                    return <h3 key={i} className="text-base font-semibold text-white mt-4 mb-2">{trimmedLine.replace('### ', '')}</h3>;
                }
                if (trimmedLine.startsWith('- ')) {
                    return (
                        <div key={i} className="flex gap-2 ml-4">
                            <span className="text-gray-500">•</span>
                            <span>{processInline(trimmedLine.replace('- ', ''))}</span>
                        </div>
                    );
                }

                return <p key={i}>{processInline(trimmedLine)}</p>;
            })}
        </div>
    );
};

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
    const { t } = useLanguage();
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const title = type === 'privacy' ? t.legal.privacyTitle : t.legal.termsTitle;

    useEffect(() => {
        if (!type) return;

        const fetchContent = async () => {
            setLoading(true);
            setError(null);
            try {
                const file = type === 'privacy' ? '/privacy.md' : '/terms.md';
                const response = await fetch(file);
                if (!response.ok) throw new Error('Failed to load content');
                const text = await response.text();
                setContent(text);
            } catch {
                setError('Unable to load content. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, [type]);

    return (
        <AnimatePresence>
            {type && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative max-w-4xl w-full max-h-[85vh] overflow-hidden rounded-2xl bg-[#1a1b1e] border border-white/10 shadow-2xl flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#1a1b1e] z-10 shrink-0">
                            <h2 className="text-lg font-bold text-white">{title}</h2>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="overflow-y-auto p-5 md:p-6 flex-1">
                            {loading && (
                                <div className="flex items-center justify-center py-12">
                                    <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
                                </div>
                            )}
                            {error && (
                                <div className="text-center py-12 text-red-400">
                                    {error}
                                </div>
                            )}
                            {!loading && !error && content && (
                                <MarkdownRenderer content={content} />
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
