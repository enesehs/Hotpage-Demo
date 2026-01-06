import React from 'react';
import { Github, Heart, Instagram, Linkedin } from 'lucide-react';
import { LegalModal } from './LegalModal';
import { useLanguage } from '../i18n/LanguageContext';

const EnesehsLogo = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 512 512"
        preserveAspectRatio="xMidYMid meet"
        fill="currentColor"
        fillRule="evenodd"
    >
        <g transform="translate(0,512) scale(0.1,-0.1)" stroke="none">
            <path d="M1045 5105 c-263 -41 -477 -149 -671 -340 -160 -157 -254 -308 -319
        -515 -57 -182 -56 -150 -52 -1738 3 -1333 4 -1463 20 -1527 63 -257 159 -435
        330 -612 142 -147 295 -243 492 -309 200 -67 146 -65 1763 -61 1362 3 1462 4
        1532 21 257 61 458 174 631 354 170 176 266 354 325 602 17 70 18 175 21 1532
        4 1617 6 1563 -61 1763 -68 204 -164 354 -321 502 -196 186 -425 297 -688 332
        -121 17 -2897 13 -3002 -4z m1820 -1246 c613 -68 1045 -420 1172 -958 21 -88
        26 -140 30 -308 l6 -203 -1197 0 -1196 0 0 -45 c0 -25 7 -80 16 -122 66 -321
        273 -531 609 -619 175 -46 483 -45 655 2 233 63 411 189 482 339 l30 65 284 0
        c160 0 284 -4 284 -9 0 -5 -9 -40 -21 -77 -118 -386 -487 -653 -1034 -749
        -198 -35 -539 -36 -734 -4 -614 102 -1033 475 -1146 1019 -52 250 -30 595 52
        825 221 614 873 936 1708 844z"/>
            <path d="M2415 3459 c-108 -14 -239 -55 -339 -106 -112 -58 -243 -182 -299
        -283 -37 -68 -91 -218 -100 -282 l-6 -38 906 0 906 0 -7 60 c-36 316 -243 543
        -567 623 -141 35 -337 45 -494 26z"/>
        </g>
    </svg>
);

export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    const [legalType, setLegalType] = React.useState<'privacy' | 'terms' | null>(null);
    const { t } = useLanguage();

    return (
        <footer className="relative mt-20 bg-gradient-to-b from-transparent via-black/50 to-black">
            <LegalModal type={legalType} onClose={() => setLegalType(null)} />

            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo & Description */}
                    <div className="md:col-span-2">
                        <img
                            src={`${import.meta.env.BASE_URL}header-logo.webp`}
                            alt="Hotpage"
                            className="h-16 w-auto opacity-90 mb-6"
                        />
                        <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-md">
                            {t.features.cards.openSource.desc}
                        </p>
                        <div className="flex items-center gap-4">
                            <a
                                href="https://enesehs.dev"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-white transition-colors"
                            >
                                <EnesehsLogo />
                            </a>
                            <a
                                href="https://github.com/enesehs/Hotpage"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-white transition-colors"
                            >
                                <Github size={20} />
                            </a>
                            <a
                                href="https://instagram.com/enesehs"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-white transition-colors"
                            >
                                <Instagram size={20} />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/enesehs"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-white transition-colors"
                            >
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-medium mb-4 text-sm">{t.footer.product}</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#features-grid" className="hover:text-white transition-colors">{t.footer.links.features}</a></li>
                            <li><a href="https://enesehs.dev/Hotpage-Demo" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Live Demo</a></li>
                            <li><a href="https://github.com/enesehs/Hotpage" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-white font-medium mb-4 text-sm">{t.footer.legal}</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>
                                <button onClick={() => setLegalType('privacy')} className="hover:text-white transition-colors text-left">
                                    {t.footer.links.privacy}
                                </button>
                            </li>
                            <li>
                                <button onClick={() => setLegalType('terms')} className="hover:text-white transition-colors text-left">
                                    {t.footer.links.terms}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-gray-500">
                        {t.footer.copyright.replace('2024', currentYear.toString())}
                    </p>
                    <p className="text-xs text-gray-600 flex items-center gap-1">
                        Made with <Heart size={12} /> by
                        <a href="https://github.com/enesehs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors sm:text-left">
                            enesehs.dev
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};
