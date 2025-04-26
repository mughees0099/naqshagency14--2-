const logos = [
    { src: "/Lakers.png", alt: "Lakers" },
    { src: "/metapastry-logo.png", alt: "Metapastry" },
    { src: "/AlpineFoods logo.png", alt: "Alpine Foods" },
    { src: "/Notion.png", alt: "Notion" },
    { src: "/Adobe.png", alt: "Adobe" },
    { src: "/fiverr.png", alt: "Fiverr" },
  ];

  import Image from 'next/image'
  
  export default function BrandLogos() {
    return (
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
        {logos.map((logo, index) => (
          <div
            key={index}
            className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
          >
            <div className="w-24 h-12 rounded">
              <Image src={logo.src} height={48} width={96} alt={logo.alt} />
            </div>
          </div>
        ))}
      </div>
    );
  }
  