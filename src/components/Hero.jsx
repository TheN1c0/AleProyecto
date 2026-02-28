import React from 'react';

const Hero = () => {
    return (
        <section style={{
            position: 'relative',
            height: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            backgroundColor: 'var(--color-primary-forestDeep)'
        }}>
            {/* Video Background */}
            <video
                autoPlay
                muted
                loop
                playsInline
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: 1
                }}
            >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-aesthetic-flower-arrangement-43034-large.mp4" type="video/mp4" />
                {/* Fallback to background color if video fails */}
            </video>

            {/* Overlay Gradient */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to bottom, var(--color-overlay-darkGradientTop), var(--color-overlay-darkGradientBottom))',
                zIndex: 2
            }} />

            {/* Content */}
            <div className="container" style={{
                position: 'relative',
                zIndex: 3,
                textAlign: 'center',
                maxWidth: '900px',
                color: 'var(--color-neutral-cream)'
            }}>
                <div className="animate-fade-up">
                    <span className="small-caps" style={{ color: 'var(--color-accent-goldSoft)', display: 'block', marginBottom: '1rem' }}>
                        Botanical Artisanal
                    </span>
                    <h1 className="hero-title" style={{ marginBottom: '1.5rem' }}>Casa Almara</h1>
                    <p style={{
                        fontSize: 'var(--font-body-size)',
                        maxWidth: '650px',
                        margin: '0 auto 2.5rem',
                        opacity: 0.9
                    }}>
                        An elegant, botanical-inspired bazaar featuring handcrafted goods, seasonal offerings, and timeless pieces designed to bring nature into your everyday rituals.
                    </p>
                    <a href="#catalog" className="btn btn-outline-light">
                        Explore Collection
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
