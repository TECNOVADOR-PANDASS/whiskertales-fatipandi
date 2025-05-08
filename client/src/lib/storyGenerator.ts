import { getAnimalCharacter } from "./animalCharacters";
import { getThematicPlot } from "./thematicPlots";
import { getStoryTemplate } from "./storyTemplates";

export interface Story {
  title: string;
  content: string;
  childName: string;
  animal: string;
  theme: string;
}

/**
 * Generate a personalized bedtime story based on user inputs
 */
export function generateStory(childName: string, animal: string, theme: string): Story {
  // Get the animal character details
  const animalCharacter = getAnimalCharacter(animal);
  
  // Get the thematic plot based on the selected theme
  const plot = getThematicPlot(theme);
  
  // Get a story template
  const template = getStoryTemplate();
  
  // Generate a title
  const titleOptions = [
    `${childName} and the ${animalCharacter.description} ${animal}`,
    `The ${theme} ${animal}`,
    `${animalCharacter.name} the ${animal}'s ${theme} Adventure`,
    `A Magical Night with ${animalCharacter.name} the ${animal}`,
    `${childName}'s Dream Journey with ${animalCharacter.name}`
  ];
  
  const title = titleOptions[Math.floor(Math.random() * titleOptions.length)];
  
  // Generate story content by combining template with character and plot details
  const content = generateStoryContent(childName, animalCharacter, plot, template);
  
  return {
    title,
    content,
    childName,
    animal,
    theme
  };
}

/**
 * Generate the actual story content by combining all story elements
 */
function generateStoryContent(
  childName: string,
  animalCharacter: any,
  plot: any,
  template: any
): string {
  // Replace placeholders in the template with actual content
  let content = template.content
    .replace(/\{childName\}/g, childName)
    .replace(/\{animalName\}/g, animalCharacter.name)
    .replace(/\{animalType\}/g, animalCharacter.type)
    .replace(/\{animalDescription\}/g, animalCharacter.description)
    .replace(/\{habitat\}/g, animalCharacter.habitat)
    .replace(/\{specialAbility\}/g, animalCharacter.specialAbility)
    .replace(/\{funFact\}/g, animalCharacter.funFact)
    .replace(/\{plotIntro\}/g, plot.introduction)
    .replace(/\{plotChallenge\}/g, plot.challenge)
    .replace(/\{plotResolution\}/g, plot.resolution)
    .replace(/\{plotLearning\}/g, plot.learning)
    .replace(/\{timeOfDay\}/g, getRandomTimeOfDay())
    .replace(/\{weather\}/g, getRandomWeather())
    .replace(/\{season\}/g, getRandomSeason());
  
  // Add some random animal sounds based on the animal type
  content = addAnimalSounds(content, animalCharacter);
  
  // Add the closing to the story
  content += `\n\nAs ${childName}'s eyes grew heavy, they knew that the lesson of ${animalCharacter.name} the ${animalCharacter.type} would stay with them forever: ${plot.moralMessage}.\n\nAnd as they drifted off to sleep, ${childName} could almost hear ${animalCharacter.name} whispering, "Sweet dreams, my friend. Until our next adventure."`;
  
  return content;
}

/**
 * Add appropriate animal sounds to the story
 */
function addAnimalSounds(content: string, animalCharacter: any): string {
  const soundPattern = "{sound}";
  
  // If no sound placeholder is in the content, return as is
  if (!content.includes(soundPattern)) {
    return content;
  }
  
  // Define sounds for different animal types
  const animalSounds: Record<string, string[]> = {
    "Rabbit": ["thumped their foot", "sniffled quietly", "made a soft purring sound"],
    "Fox": ["yipped excitedly", "let out a quiet bark", "made a gentle chattering sound"],
    "Bear": ["growled softly", "let out a gentle huff", "rumbled deeply"],
    "Owl": ["hooted softly", "made a gentle 'who-who' sound", "clicked their beak"],
    "Elephant": ["trumpeted happily", "let out a gentle rumble", "flapped their ears with a whoosh"],
    "Lion": ["purred deeply", "let out a gentle roar", "swished their tail with pride"],
    "Turtle": ["made a soft clicking sound", "retracted slightly into their shell", "blinked slowly and deliberately"],
    "Wolf": ["howled softly", "let out a gentle whine", "nuzzled closer"],
    "Giraffe": ["made a gentle humming sound", "blinked their long eyelashes", "swished their tail"],
    "Koala": ["made a gentle grunting sound", "let out a soft cough", "munched sleepily on a eucalyptus leaf"],
    "Tiger": ["made a chuffing sound", "swished their striped tail", "let out a gentle growl"],
    "Penguin": ["let out a gentle squawk", "flapped their flippers excitedly", "waddled happily"],
    "Squirrel": ["chittered excitedly", "flicked their bushy tail", "made a soft clicking sound"],
    "Hedgehog": ["snuffled quietly", "made their quills stand up slightly", "let out a tiny sneeze"],
    "Panda": ["munched contentedly", "made a gentle bleating sound", "rolled playfully"],
    "Dolphin": ["clicked happily", "let out a series of gentle whistles", "splashed playfully"],
    "Monkey": ["hooted softly", "made a gentle chattering sound", "scratched their head thoughtfully"]
  };
  
  // Get sounds for the specific animal, or use generic sounds if none defined
  const sounds = animalSounds[animalCharacter.type] || ["made a gentle sound", "looked on thoughtfully", "moved closer"];
  
  // Replace each sound placeholder with a randomly selected sound
  while (content.includes(soundPattern)) {
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    content = content.replace(soundPattern, randomSound);
  }
  
  return content;
}

/**
 * Get a random time of day for the story
 */
function getRandomTimeOfDay(): string {
  const times = [
    "sunset", "twilight", "dusk", "evening", "nighttime", 
    "midnight", "under the moonlight", "as stars twinkled above",
    "as the moon rose high", "in the gentle darkness"
  ];
  return times[Math.floor(Math.random() * times.length)];
}

/**
 * Get a random weather condition for the story
 */
function getRandomWeather(): string {
  const weather = [
    "a clear, starry night", "a gentle breeze", "soft moonlight",
    "a sky full of stars", "silver moonbeams", "twinkling starlight",
    "a peaceful night", "quiet stillness", "gentle night sounds",
    "the soft hooting of owls", "the gentle rustling of leaves"
  ];
  return weather[Math.floor(Math.random() * weather.length)];
}

/**
 * Get a random season for the story
 */
function getRandomSeason(): string {
  const seasons = ["spring", "summer", "autumn", "winter"];
  return seasons[Math.floor(Math.random() * seasons.length)];
}
