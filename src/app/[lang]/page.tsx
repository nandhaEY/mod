import { getDictionary } from "@/dictionaries";
import { Locale } from "@/i18n-config";

const Lang = async ({ params }: { params: Promise<{ lang: Locale }> }) => {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return (
    <>
      <h1>{dict.language}</h1>
      <h1>{dict.welcomeMessage}</h1>
    </>
  );
};

export default Lang;
