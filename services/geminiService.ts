import { GoogleGenAI, Type } from "@google/genai";
import { InstrumentClass, Instructor } from '../types';

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. Using fallback data. The application will not be able to generate content from the Gemini API.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "fallback_key_for_initialization" });

const generateSiteContent = async (
  classes: Omit<InstrumentClass, 'description'>[],
  instructors: Omit<Instructor, 'bio'>[]
): Promise<{ generatedClasses: InstrumentClass[], generatedInstructors: Instructor[] }> => {
  if (!process.env.API_KEY) {
     throw new Error("API key is not configured.");
  }
  
  const classNames = classes.map(c => c.name).join(', ');
  const instructorDetails = instructors.map(i => `${i.name} (specializing in ${i.instrument})`).join('; ');

  const prompt = `
    You are a creative content writer for a prestigious flute academy called "Atharva Flute Academy".
    Your task is to generate inspiring and concise descriptions for specialized flute classes and professional bios for the instructors.
    The tone should be elegant, spiritual, and welcoming.
    
    Generate content for the following items:
    1. Classes: ${classNames}
    2. Instructors: ${instructorDetails}
    
    Return the content as a single JSON object.
  `;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      classDescriptions: {
        type: Type.ARRAY,
        description: "An array of music class descriptions.",
        items: {
          type: Type.OBJECT,
          properties: {
            className: { type: Type.STRING, description: "The name of the class, e.g., 'Bansuri (Indian Bamboo Flute)'" },
            description: { type: Type.STRING, description: "A short, inspiring 2-sentence description for the class." }
          },
          required: ["className", "description"]
        }
      },
      instructorBios: {
        type: Type.ARRAY,
        description: "An array of instructor biographies.",
        items: {
          type: Type.OBJECT,
          properties: {
            instructorName: { type: Type.STRING, description: "The full name of the instructor." },
            bio: { type: Type.STRING, description: "A short, professional, and friendly 3-sentence bio highlighting their expertise." }
          },
          required: ["instructorName", "bio"]
        }
      }
    },
    required: ["classDescriptions", "instructorBios"]
  };
  
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: responseSchema,
      temperature: 0.8,
    }
  });

  const content = JSON.parse(response.text);

  const generatedClasses = classes.map(cls => {
    const found = content.classDescriptions.find((c: any) => c.className.toLowerCase() === cls.name.toLowerCase());
    return { ...cls, description: found ? found.description : "Learn to play with passion and precision." };
  });

  const generatedInstructors = instructors.map(inst => {
    const found = content.instructorBios.find((i: any) => i.instructorName.toLowerCase() === inst.name.toLowerCase());
    return { ...inst, bio: found ? found.bio : "An inspiring mentor dedicated to your musical growth." };
  });

  return { generatedClasses, generatedInstructors };
};

export { generateSiteContent };