import { motion } from "motion/react";
export default function AnimatedGradientButton({
  icon = null,
  label = "Home",
  action = () => null,
}) {
  return (
    <motion.button
      onClick={action}
      className={`group relative overflow-hidden rounded-full p-px transition-transform active:scale-95 dark:bg-neutral-600`}
    >
      <motion.span
        animate={{
          top: ["50%", "0%", "50%", "100%", "50%"],
          left: ["0%", "50%", "100%", "50%", "0%"],
        }}
        className="absolute z-10 size-8 -translate-x-1/2 -translate-y-1/2 transform-gpu blur-sm transition-transform duration-300 group-hover:scale-[3]"
        initial={{ top: 0, left: 0 }}
        transition={{
          duration: 3,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
        }}
      >
        <motion.span
          animate={{
            rotate: ["0deg", "360deg"],
          }}
          className="block size-full transform-gpu rounded-full"
          style={{
            background:
              "linear-gradient(135deg, #3BC4F2, #7A69F9, #F26378, #F5833F)",
          }}
          transition={{
            duration: 3,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
      </motion.span>
      <span className="relative z-10 block rounded-full bg-current px-3 py-1 dark:bg-neutral-800">
        <motion.span
          animate={{
            backgroundImage: [
              "linear-gradient(90deg, #3BC4F2, #7A69F9, #F26378, #F5833F)",
              "linear-gradient(90deg, #F5833F,#3BC4F2, #7A69F9, #F26378)",
              "linear-gradient(90deg, #F26378, #F5833F,#3BC4F2, #7A69F9)",
              "linear-gradient(90deg, #7A69F9, #F26378, #F5833F,#3BC4F2)",
              "linear-gradient(90deg, #3BC4F2, #7A69F9, #F26378, #F5833F)",
            ],
          }}
          className="transform-gpu bg-clip-text text-sm tracking-tighter text-neutral-600 text-transparent transition-colors duration-500 dark:text-neutral-200"
          transition={{
            duration: 1,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          <span className="mr-2 text-xl">{label} </span>
        </motion.span>
      </span>
    </motion.button>
  );
}
