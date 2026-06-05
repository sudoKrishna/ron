import KeyboardButton from "./Button";

export default function Input() {
  return (
    <div className="relative z-10 flex justify-center mt-10">
      <div className="flex items-center w-[520px] rounded-full border border-black/40 bg-white/10 backdrop-blur-xl shadow-2xl">

        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 bg-transparent px-6 py-4 text-white placeholder:text-gray-300 outline-none"
        />

        <KeyboardButton />

      </div>
    </div>
  );
}