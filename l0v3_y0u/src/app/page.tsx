"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoveLetterEnvelope() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Detecta o tamanho da tela para diferenciar mobile e desktop
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleOpen = () => {
    setOpen((prev) => !prev);
    audioRef.current?.play();
  };
  const imageVariants = {
    hidden: {
      opacity: 0,
      x: 0,
      y: 0,
      scale: 0.95,
    },
    visibleMobile: {
      opacity: 1,
      y: 150, // Desliza para cima (ajuste conforme necessário)
      scale: 1.05,
      transition: { duration: 0.7, ease: "easeInOut" },
    },
    visibleDesktop: {
      opacity: 1,
      x: -350,
      y: -300, // Desliza para a direita (ajuste conforme necessário)
      scale: 1.05,
      transition: { duration: 0.7, ease: "easeInOut" },
    },
  };

  // Variants para a carta
  const letterVariants = {
    hidden: {
      opacity: 0,
      x: 0,
      y: 0,
      scale: 0.95,
    },
    visibleMobile: {
      opacity: 1,
      y: 100, // Desliza para cima (ajuste conforme necessário)
      scale: 1.05,
      transition: { duration: 0.7, ease: "easeInOut" },
    },
    visibleDesktop: {
      opacity: 1,
      x: 400,
      y: -300, // Desliza para a direita (ajuste conforme necessário)
      scale: 1.05,
      transition: { duration: 0.7, ease: "easeInOut" },
    },
  };

  // Variants para o flap (aba do envelope)
  const flapVariants = {
    closed: { rotateX: 180, transition: { duration: 0.7, ease: "easeInOut" } },
    open: { rotateX: 0, transition: { duration: 0.7, ease: "easeInOut" } },
  };

  // Escolhe o variant da carta conforme estado e tamanho de tela
  const letterVariant = open
    ? isMobile
      ? "visibleMobile"
      : "visibleDesktop"
    : "hidden";
  const imageVariant = open
    ? isMobile
      ? "visibleMobile"
      : "visibleDesktop"
    : "hidden";

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-pink-100 via-pink-200 to-pink-300"
      style={{ perspective: "1000px" }}
    >
      <h1 className="text-3xl font-bold text-pink-800 mb-24">
        💌 A Letter Just for You
      </h1>

      <div className="relative w-96 h-80 mb-8">
        {/* -----------------------
            CARTA (conteúdo) 
        ------------------------*/}

        <AnimatePresence>
          {open && (
            <motion.div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2
                         w-80 max-h-56 p-4 overflow-y-auto
                         text-center text-pink-900 bg-white
                         border-2 border-pink-400 rounded-md shadow-xl
                         font-medium z-40"
              variants={letterVariants}
              initial="hidden"
              animate={letterVariant}
              exit="hidden"
            >
              {/* Imagem */}
              <img
                src="/Eu_e_Meu_Amor.jpeg"
                alt="Foto especial"
                className="w-full mb-4 rounded-md object-cover"
              />

              {/* Texto da carta */}
              <h3>
                Olá, gatinha, eu te amo demais! 💖
                <br />
                Hoje nós estamos fazendo dois meses juntos, e isso é muito
                incrível, são dois meses estando ao lado da pessoa mais perfeita
                que já pude conhecer, a sua alma é pura, você é incrível, seu
                intelecto é admirável, possui a maior beleza de todas, você é
                perfeita. Sempre busquei respostas para descrever os fenômenos
                que aconteciam, e o meu amor por ti é fenomenal, ele transcende
                barreiras, e você é um fenômeno, então, preciso estudar afundo o
                motivo da sua perfeição. Para explicar o quão perfeita é, fui
                atrás da etimologia do seu nome, e com isso, encontrei coisas
                interessantes. Meu amor, seu nome é muito lindo, Geovana, é uma
                variante do nome italiano Giovanna, considerado uma versão de
                Joana, que se originou a partir de João, proveniente do hebraico
                Iohanan, derivado da união dos elementos Yah “Javé, Jeová, Deus”
                e hannah “graça”. Tendo em seu significado como, “dádiva de
                Deus” ou “presente de Deus”, após isso, já pude declarar a minha
                busca como encerrada, pois, eu havia sido agraciado com o
                presente de Deus, uma Dádiva a pessoa mais abençoada e perfeita
                que eu poderia encontrar, então, meu amor, encerro a minha carta
                com muito orgulho de estar ao lado do Presente de Deus, e poder
                cuidar dessa Dádiva, eu te amo demais, meu amor, Feliz 2 meses,
                você é perfeita, obrigado por tudo, eu te amo. <br></br>Com
                carinho <br></br> Ass: Guilherme A. Gongora
              </h3>
            </motion.div>
          )}
        </AnimatePresence>

        {/* -----------------------
            CORPO INFERIOR DO ENVELOPE
        ------------------------*/}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-pink-300 border-2 border-pink-400 rounded-b-md z-10" />

        {/* -----------------------
            FLAP (ABA DO ENVELOPE)
            Encosta na parte superior do retângulo
        ------------------------*/}
        <motion.div
          className="absolute left-0 bottom-1/2 w-full flex justify-center items-end z-50"
          style={{ transformOrigin: "bottom center" }}
          variants={flapVariants}
          animate={open ? "open" : "closed"}
        >
          <div
            className="relative w-0 h-0
                       border-l-[6rem] border-r-[6rem] border-b-[6rem]
                       border-l-transparent border-r-transparent border-b-pink-300"
          >
            <button
              aria-pressed={open}
              aria-label="Abrir ou fechar envelope"
              onClick={toggleOpen}
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2
                         text-2xl z-50 animate-pulse focus:outline-none"
            >
              💖
            </button>
          </div>
        </motion.div>
      </div>

      <p className="text-sm text-pink-800 italic">
        Clique no coração para abrir a carta 💝
      </p>

      {/* Áudio opcional */}
      <audio ref={audioRef} src="/path/to/sound.mp3" />
    </div>
  );
}
