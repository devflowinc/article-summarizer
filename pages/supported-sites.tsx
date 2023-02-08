import Footer from "../components/Footer";
import Header from "../components/Header";
import {
  formattedSupportedDomains,
  supportedDomains,
} from "../components/SupportedSitesRewriter";

const SupportedSites = () => {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-between pt-8 sm:pt-12">
      <Header />
      <main className="mx-auto mt-10 flex h-full max-w-5xl flex-1 flex-col justify-center px-2 sm:mt-40">
        <h1 className="mb-6  text-center text-4xl font-bold sm:text-6xl">
          Supported sites
        </h1>
        {formattedSupportedDomains.map((domain, index) => (
          <div
            className="my-2 flex flex-col items-center justify-center"
            key={index}
          >
            <a
              className="text-center text-xl text-green-500 underline sm:text-4xl"
              href={`https://${supportedDomains[index]}`}
              aria-label={`Go to ${domain}`}
              target="_blank"
              rel="noreferrer"
            >
              {domain}
            </a>
          </div>
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default SupportedSites;
