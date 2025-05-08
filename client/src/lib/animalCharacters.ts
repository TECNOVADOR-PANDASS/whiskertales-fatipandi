interface AnimalCharacter {
  type: string;
  name: string;
  description: string;
  habitat: string;
  specialAbility: string;
  funFact: string;
}

/**
 * Animal character database with details for each animal
 */
const animalCharacters: Record<string, AnimalCharacter[]> = {
  "Rabbit": [
    {
      type: "Rabbit",
      name: "Hoppy",
      description: "fluffy",
      habitat: "meadow",
      specialAbility: "incredible jumping ability and sensitive hearing",
      funFact: "rabbits can see behind them without turning their heads because their eyes are positioned high on the sides of their head"
    },
    {
      type: "Rabbit",
      name: "Thumper",
      description: "soft-furred",
      habitat: "forest",
      specialAbility: "lightning-fast running and the ability to sense danger",
      funFact: "rabbits perform a special jump called a 'binky' when they're happy, twisting their body and kicking their feet in the air"
    }
  ],
  "Fox": [
    {
      type: "Fox",
      name: "Rusty",
      description: "clever",
      habitat: "woodland",
      specialAbility: "quick thinking and problem-solving",
      funFact: "foxes have whiskers on their legs as well as their faces to help them navigate in the dark"
    },
    {
      type: "Fox",
      name: "Amber",
      description: "bushy-tailed",
      habitat: "forest edge",
      specialAbility: "exceptional hearing that can detect small animals underground",
      funFact: "foxes use the Earth's magnetic field to help them hunt, being the only animal we know that uses magnetic fields to judge distance"
    }
  ],
  "Bear": [
    {
      type: "Bear",
      name: "Bruno",
      description: "gentle",
      habitat: "mountain forest",
      specialAbility: "amazing sense of smell and incredible strength",
      funFact: "bears have excellent memories and can remember food sources from years ago"
    },
    {
      type: "Bear",
      name: "Honey",
      description: "fluffy",
      habitat: "river valley",
      specialAbility: "fishing with their paws and climbing trees",
      funFact: "bears can run as fast as horses despite their large size, reaching speeds of 35 miles per hour"
    }
  ],
  "Owl": [
    {
      type: "Owl",
      name: "Hootie",
      description: "wise",
      habitat: "ancient oak tree",
      specialAbility: "rotating their head almost completely around and silent flight",
      funFact: "owls have special feathers that make their flight completely silent, helping them sneak up on prey"
    },
    {
      type: "Owl",
      name: "Whisper",
      description: "wide-eyed",
      habitat: "hollow tree",
      specialAbility: "seeing perfectly in the dark and hearing tiny sounds from far away",
      funFact: "an owl's eyes are so large that they take up over 50% of their skull, and they can't move their eyes - that's why they turn their heads!"
    }
  ],
  "Elephant": [
    {
      type: "Elephant",
      name: "Ellie",
      description: "gentle",
      habitat: "savanna",
      specialAbility: "using their trunk like a hand and communicating over long distances",
      funFact: "elephants can recognize themselves in mirrors, showing they have self-awareness like humans"
    },
    {
      type: "Elephant",
      name: "Trumpet",
      description: "big-eared",
      habitat: "grassland",
      specialAbility: "remembering all their friends and family members for decades",
      funFact: "elephants 'talk' to each other using sounds too low for humans to hear, allowing them to communicate over several miles"
    }
  ],
  "Lion": [
    {
      type: "Lion",
      name: "Leo",
      description: "majestic",
      habitat: "pride lands",
      specialAbility: "leading their pride and protecting their family",
      funFact: "a lion's roar can be heard up to 5 miles away, the loudest of any big cat"
    },
    {
      type: "Lion",
      name: "Savannah",
      description: "golden-maned",
      habitat: "grassy plains",
      specialAbility: "hunting cooperatively with their pride members",
      funFact: "lions are the only cats that live in groups called prides, working together as a family"
    }
  ],
  "Turtle": [
    {
      type: "Turtle",
      name: "Shelly",
      description: "patient",
      habitat: "crystal clear pond",
      specialAbility: "carrying their home wherever they go and living for a very long time",
      funFact: "some turtles can breathe through their bottoms! They take in oxygen through special sacs near their tail when hibernating"
    },
    {
      type: "Turtle",
      name: "Slider",
      description: "slow-moving",
      habitat: "lazy river",
      specialAbility: "holding their breath underwater for hours and hiding in their shell",
      funFact: "turtles have been around since the time of dinosaurs, over 200 million years ago"
    }
  ],
  "Wolf": [
    {
      type: "Wolf",
      name: "Luna",
      description: "loyal",
      habitat: "northern forest",
      specialAbility: "working together with their pack and howling to communicate",
      funFact: "wolves can hear other wolves howling from up to 10 miles away in the forest"
    },
    {
      type: "Wolf",
      name: "Shadow",
      description: "silver-furred",
      habitat: "mountain wilderness",
      specialAbility: "traveling long distances and caring for their pack members",
      funFact: "wolf pups are born blind and deaf, and the whole pack helps take care of them, like having many babysitters"
    }
  ],
  "Giraffe": [
    {
      type: "Giraffe",
      name: "Stretch",
      description: "tall",
      habitat: "acacia plains",
      specialAbility: "reaching the highest leaves that no other animal can get",
      funFact: "giraffes only need to drink water once every few days because they get most of their water from the plants they eat"
    },
    {
      type: "Giraffe",
      name: "Spots",
      description: "long-necked",
      habitat: "savanna",
      specialAbility: "seeing danger from far away with their height advantage",
      funFact: "a giraffe's spots are unique like human fingerprints - no two giraffes have the same pattern"
    }
  ],
  "Koala": [
    {
      type: "Koala",
      name: "Eucly",
      description: "sleepy",
      habitat: "eucalyptus forest",
      specialAbility: "climbing trees and sleeping for up to 20 hours a day",
      funFact: "baby koalas (called joeys) are only the size of a jelly bean when they're born and crawl into their mother's pouch to grow"
    },
    {
      type: "Koala",
      name: "Cuddles",
      description: "fuzzy",
      habitat: "gum tree canopy",
      specialAbility: "digesting poisonous eucalyptus leaves that other animals can't eat",
      funFact: "koalas have fingerprints so similar to humans that they've sometimes confused crime scene investigators!"
    }
  ],
  "Tiger": [
    {
      type: "Tiger",
      name: "Stripes",
      description: "powerful",
      habitat: "dense jungle",
      specialAbility: "swimming well and blending into tall grass with their stripes",
      funFact: "tigers have striped skin, not just striped fur. If you shaved a tiger, the stripes would still be visible!"
    },
    {
      type: "Tiger",
      name: "Raja",
      description: "magnificent",
      habitat: "bamboo forest",
      specialAbility: "moving silently despite their large size and incredible jumping",
      funFact: "a tiger's roar is so powerful it can paralyze animals that hear it, making them too scared to run away"
    }
  ],
  "Penguin": [
    {
      type: "Penguin",
      name: "Waddles",
      description: "tuxedo-wearing",
      habitat: "icy shore",
      specialAbility: "swimming like a torpedo and sliding on their bellies",
      funFact: "penguins propose to each other with a perfect pebble that they search for and give as a gift"
    },
    {
      type: "Penguin",
      name: "Chilly",
      description: "playful",
      habitat: "antarctic colony",
      specialAbility: "staying warm in freezing temperatures with special feathers and fat",
      funFact: "emperor penguin dads hold their egg on their feet for two months in the freezing cold without eating anything"
    }
  ],
  "Squirrel": [
    {
      type: "Squirrel",
      name: "Nutty",
      description: "bushy-tailed",
      habitat: "old oak tree",
      specialAbility: "remembering where they hide thousands of nuts and jumping between branches",
      funFact: "squirrels plant thousands of trees by accident when they forget where they buried their nuts"
    },
    {
      type: "Squirrel",
      name: "Acorn",
      description: "quick",
      habitat: "city park",
      specialAbility: "climbing headfirst down trees and balancing on the thinnest branches",
      funFact: "squirrels use their tails as umbrellas when it rains and as blankets when it's cold"
    }
  ],
  "Hedgehog": [
    {
      type: "Hedgehog",
      name: "Spike",
      description: "prickly",
      habitat: "garden undergrowth",
      specialAbility: "rolling into a perfect ball when scared and sensing with their spines",
      funFact: "baby hedgehogs are called hoglets, and they're born with soft spines under their skin that pop out a few hours after birth"
    },
    {
      type: "Hedgehog",
      name: "Prickles",
      description: "small",
      habitat: "forest floor",
      specialAbility: "finding food with their excellent sense of smell and running surprisingly fast",
      funFact: "hedgehogs make a cute 'self-anointing' foam when they find new smells, spreading it on their spines with their tongue"
    }
  ],
  "Panda": [
    {
      type: "Panda",
      name: "Bamboo",
      description: "black-and-white",
      habitat: "misty bamboo forest",
      specialAbility: "using their extra 'thumb' (actually a wrist bone) to hold bamboo and climbing tall trees",
      funFact: "newborn pandas are tiny - only about the size of a stick of butter - and 900 times smaller than their mothers"
    },
    {
      type: "Panda",
      name: "Oreo",
      description: "cuddly",
      habitat: "mountain bamboo grove",
      specialAbility: "eating bamboo all day long and being expert climbers despite their size",
      funFact: "pandas can eat for up to 14 hours a day and poop up to 40 times daily because bamboo is hard to digest"
    }
  ],
  "Dolphin": [
    {
      type: "Dolphin",
      name: "Splash",
      description: "playful",
      habitat: "clear blue ocean",
      specialAbility: "using echolocation to 'see' with sound and communicating with whistles",
      funFact: "dolphins call each other by name using special whistles that are unique to each dolphin, like having their own signature song"
    },
    {
      type: "Dolphin",
      name: "Echo",
      description: "intelligent",
      habitat: "coral reef",
      specialAbility: "swimming very fast and jumping high out of the water",
      funFact: "dolphins sleep with only half their brain at a time, keeping one eye open to watch for danger and remember to breathe"
    }
  ],
  "Monkey": [
    {
      type: "Monkey",
      name: "Chatter",
      description: "curious",
      habitat: "rainforest canopy",
      specialAbility: "using their tail like an extra hand and making incredible leaps between trees",
      funFact: "some monkeys wash their food in streams before eating it, teaching this habit to their babies"
    },
    {
      type: "Monkey",
      name: "Bananas",
      description: "mischievous",
      habitat: "tropical jungle",
      specialAbility: "using tools like sticks to get food and making over 30 different sounds to communicate",
      funFact: "monkeys in Japan learn to use vending machines, trading coins for food, and they even choose their favorite snacks"
    }
  ]
};

/**
 * Get a random animal character for the specified animal type
 */
export function getAnimalCharacter(animalType: string): AnimalCharacter {
  // If we have characters for this animal, randomly select one
  if (animalCharacters[animalType] && animalCharacters[animalType].length > 0) {
    const characters = animalCharacters[animalType];
    return characters[Math.floor(Math.random() * characters.length)];
  }
  
  // If no characters found for this animal, create a generic one
  return {
    type: animalType,
    name: getRandomName(),
    description: getRandomDescription(),
    habitat: getRandomHabitat(),
    specialAbility: "adapting to any environment and making friends easily",
    funFact: "each animal has unique traits and behaviors that make them special in their own way"
  };
}

/**
 * Generate a random name if the animal doesn't have predefined characters
 */
function getRandomName(): string {
  const names = [
    "Whiskers", "Scout", "Lucky", "Sunny", "Star", 
    "Muffin", "Pebble", "Cocoa", "Blossom", "Pepper",
    "Ziggy", "Willow", "Ginger", "Misty", "Buddy"
  ];
  return names[Math.floor(Math.random() * names.length)];
}

/**
 * Generate a random description if the animal doesn't have predefined characters
 */
function getRandomDescription(): string {
  const descriptions = [
    "friendly", "smart", "brave", "curious", "playful",
    "gentle", "adventurous", "kind", "helpful", "clever",
    "cheerful", "energetic", "patient", "wise", "caring"
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

/**
 * Generate a random habitat if the animal doesn't have predefined characters
 */
function getRandomHabitat(): string {
  const habitats = [
    "magical forest", "hidden valley", "peaceful meadow", "ancient woods",
    "crystal cave", "rainbow hill", "starlight glade", "misty mountain",
    "sunny glade", "willow grove", "secret garden", "whispering pines"
  ];
  return habitats[Math.floor(Math.random() * habitats.length)];
}
