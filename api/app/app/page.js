"use client"
import Image from "next/image";

export default function Home() {

  const handleClick = async () => {

    let data = {
      name: "Arham",
      age: 19
    }

    const a = await fetch("/add", {
      method: "POST", headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    }
    )
    let res = await a.json()
    console.log(res);
  }

  return (
    <>
      <div>
        NExt JS api Handling
        <button onClick={() => { handleClick() }}>Click</button>
      </div>
    </>
  );
}
