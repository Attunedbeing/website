import React, { useEffect, useState } from 'react';
import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';

interface Testimonial {
    id: string;
    name: string;
    message: string;
    featured: boolean;
    order: number;
}

const TestimonialsList: React.FC<{ testimonials: Testimonial[] }> = ({ testimonials }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 40,
            scale: 0.95,
            rotate: -1
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring" as const,
                stiffness: 50,
                damping: 20,
                mass: 1.2
            }
        }
    };

    return (
        <section id="testimonials" className="py-24 pt-0 bg-stone-50 overflow-hidden relative">
            <img
                src="Images/IMG_2675_HD.JPG"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover opacity-[0.3] pointer-events-none hidden md:block"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-stone-50 via-transparent to-stone-900 pointer-events-none"></div>
            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="text-left mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 className="text-3xl md:text-5xl font-serif text-stone-900 mb-4">Testimonials</h2>
                        <p className="text-stone-600">Words from those who have journeyed with me.</p>
                    </motion.div>
                </div>

                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {testimonials.map((testimonial) => (
                        <motion.div
                            key={testimonial.id}
                            variants={itemVariants}
                            className="bg-white p-8 shadow-sm border border-sage-200 flex flex-col h-full hover:shadow-md transition-shadow duration-300"
                        >
                            <div className="mb-6 text-sage-300">
                                <Quote className="w-10 h-10 fill-current opacity-50" />
                            </div>
                            <p className="text-stone-600 italic mb-6 flex-grow leading-relaxed">
                                "{testimonial.message}"
                            </p>
                            <div className="mt-auto">
                                <p className="font-serif text-stone-900 text-lg">{testimonial.name}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export const Testimonials: React.FC = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/testimonials')
            .then(res => res.json())
            .then(data => {
                setTestimonials(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <section className="py-20 bg-stone-50">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-stone-500">Loading stories...</p>
                </div>
            </section>
        );
    }

    if (testimonials.length === 0) {
        return null;
    }

    return <TestimonialsList testimonials={testimonials} />;
};
