import Image from "next/image";

export function Card() {
  return (
    <div className="flex flex-col items-center w-[37rem] h-min rounded-[0.5rem] bg-[#FFFFFF] p-[2rem] gap-[1.5rem]">
      <Image
        src={"/logo.png"}
        alt="Logo do conselho tutelar de piracicaba"
        width={100}
        height={100}
      />

      <h1>ouyiuyiuyuy</h1>

      <div>form</div>
    </div>
  );
}
