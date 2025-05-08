interface ThematicPlot {
  introduction: string;
  challenge: string;
  resolution: string;
  learning: string;
  moralMessage: string;
}

/**
 * Theme-based plot structures for the stories
 */
const thematicPlots: Record<string, ThematicPlot[]> = {
  "Kindness": [
    {
      introduction: "In a world where sometimes animals forgot to be nice to each other, {animalName} the {animalType} noticed that not everyone was being treated with kindness.",
      challenge: "One day, {animalName} found a small lost creature who was sad and alone. Other animals walked right past without stopping to help. {animalName} wondered what to do.",
      resolution: "With a gentle heart, {animalName} approached the lost creature and offered friendship and help. Together they found their way home, helping others along their journey.",
      learning: "Through this adventure, {animalName} discovered that even small acts of kindness could make a big difference in someone else's life.",
      moralMessage: "Kindness costs nothing but means everything to those who receive it"
    },
    {
      introduction: "Deep in the {habitat}, {animalName} the {animalType} was known for their {description} appearance but not yet for their heart.",
      challenge: "During a terrible storm, many animals lost their homes and were struggling. Some were even unkind to each other while competing for shelter and food.",
      resolution: "{animalName} used their {specialAbility} to help build new homes and find food for everyone, showing that there was enough for all if they worked together.",
      learning: "The other animals learned from {animalName}'s example that being kind, especially during difficult times, makes everyone's lives better.",
      moralMessage: "A single act of kindness can change someone's entire world"
    }
  ],
  "Courage": [
    {
      introduction: "{animalName} the {animalType} lived in the {habitat} and was usually very shy, preferring to stay hidden where it was safe and comfortable.",
      challenge: "A dangerous situation arose when a fallen tree blocked the river, threatening to flood their homes. All the animals were too frightened to approach the rushing water.",
      resolution: "Despite being scared, {animalName} gathered their courage and used their {specialAbility} to carefully move the tree, saving everyone's homes from the flood.",
      learning: "The animals celebrated {animalName} and realized that courage isn't about not feeling afraid – it's about doing what's needed even when you are afraid.",
      moralMessage: "Bravery isn't the absence of fear, but doing what's right despite being afraid"
    },
    {
      introduction: "The {description} {animalName} was known throughout the {habitat} for always being careful and never taking risks.",
      challenge: "When a young animal became trapped on a high cliff, everyone watched in worry but were too afraid to climb the dangerous rocks to help.",
      resolution: "Though trembling with fear, {animalName} slowly made their way up the cliff, focusing on each step rather than the height, until they reached and rescued the stranded youngster.",
      learning: "{animalName} discovered that they were stronger and braver than they ever knew, and that facing your fears can help you grow in amazing ways.",
      moralMessage: "You are braver than you believe, stronger than you seem, and smarter than you think"
    }
  ],
  "Friendship": [
    {
      introduction: "{animalName} the {animalType} had many acquaintances in the {habitat}, but sometimes felt lonely because they didn't have a true friend who really understood them.",
      challenge: "When a new animal who was very different from {animalName} arrived in the {habitat}, others kept their distance. The newcomer also had an amazing {specialAbility} but felt left out.",
      resolution: "{animalName} decided to welcome the newcomer, and despite their differences, they found they enjoyed each other's company and had much to learn from one another.",
      learning: "Through their new friendship, both animals discovered that the best friends aren't always those who are most similar to you, but those who bring different gifts into your life.",
      moralMessage: "True friendship sees past our differences to the heart beneath"
    },
    {
      introduction: "In the bustling {habitat}, {animalName} the {description} {animalType} had many casual friends but longed for a deeper connection.",
      challenge: "During the changing of {season}, {animalName} faced a difficult journey and realized they couldn't make it alone. They needed help but weren't sure who to trust.",
      resolution: "Unexpectedly, several animals offered to join {animalName}'s journey, each using their unique talents to overcome obstacles together, forming bonds that grew stronger with each challenge.",
      learning: "{animalName} learned that friendship isn't just about having fun together – it's about supporting each other through difficulties and celebrating each other's successes.",
      moralMessage: "Friends are the family we choose for ourselves"
    }
  ],
  "Sharing": [
    {
      introduction: "{animalName} the {animalType} had collected the biggest pile of food in the {habitat} and was very proud of their impressive stockpile.",
      challenge: "When a harsh {season} came unexpectedly, many animals hadn't prepared enough and were hungry. {animalName} had to decide whether to keep everything for themselves or share with others.",
      resolution: "After some thought, {animalName} organized a community feast where everyone shared what they had. Together, they had more than enough, and the variety made the meal even better!",
      learning: "To {animalName}'s surprise, sharing didn't leave them with less – it created abundance, variety, and warm friendships that would help everyone through the {season}.",
      moralMessage: "When we share, we don't divide what we have – we multiply its benefits"
    },
    {
      introduction: "The {description} {animalName} had a special treasure – a wonderful {habitat} with the juiciest berries and safest shelter in the forest.",
      challenge: "Other animals often looked longingly at {animalName}'s perfect spot, but {animalName} wasn't sure about sharing their special place. What if there wasn't enough for everyone?",
      resolution: "When {animalName} finally invited others in, they discovered that each animal brought gifts: some planted new berry bushes, others helped build better shelters, and together they created something better than before.",
      learning: "{animalName} realized that sharing can transform a good thing into a great thing when everyone contributes their talents and works together.",
      moralMessage: "The joy of sharing is the best way to multiply happiness"
    }
  ],
  "Patience": [
    {
      introduction: "{animalName} the {animalType} was known throughout the {habitat} for always being in a hurry, rushing from one activity to the next without stopping to enjoy the journey.",
      challenge: "When {animalName} decided to learn an important new skill, they became frustrated when they couldn't master it immediately. It seemed so difficult and was taking too long!",
      resolution: "A wise old animal taught {animalName} to slow down and enjoy the learning process, practicing a little bit each day instead of trying to rush. Slowly but surely, improvement came.",
      learning: "Through this experience, {animalName} discovered that some of the best things in life – like skills, friendship, and understanding – grow gradually over time with patience and care.",
      moralMessage: "Patience isn't just waiting, it's how we behave while we're waiting"
    },
    {
      introduction: "In the beautiful {habitat}, {animalName} the {description} {animalType} was always the first to give up when things got difficult.",
      challenge: "{animalName} really wanted to reach the legendary Rainbow Falls that was said to be the most beautiful place in the forest, but the journey was long and full of obstacles.",
      resolution: "Instead of quitting as usual, {animalName} decided to travel just a little bit each day. Through rain, wind, and difficult paths, they kept going, one small step at a time.",
      learning: "When {animalName} finally reached the magnificent Rainbow Falls after many weeks, they realized that the patient journey itself had been just as wonderful as the destination.",
      moralMessage: "Great things come to those who wait – and work while they wait"
    }
  ],
  "Honesty": [
    {
      introduction: "{animalName} the {animalType} lived in the {habitat} and was known for their {description} appearance and {specialAbility}.",
      challenge: "One day, {animalName} accidentally broke the community's special gathering place but was too embarrassed to admit it. They let another animal take the blame, but didn't feel good about it.",
      resolution: "After seeing the wrongly accused animal's sadness, {animalName} gathered their courage and told everyone the truth, offering to repair the damage.",
      learning: "To {animalName}'s surprise, the other animals appreciated their honesty and everyone worked together to make the gathering place even better than before.",
      moralMessage: "Honesty might not always be easy, but it's always the path to peace of mind"
    },
    {
      introduction: "The {description} {animalName} was admired by all the animals in the {habitat} for their amazing stories of adventure and bravery.",
      challenge: "The only problem was that {animalName} had made up most of these stories to seem impressive. As the tales grew bigger, keeping track of all the untruths became increasingly difficult.",
      resolution: "When {animalName} finally confessed that the stories weren't true, they feared everyone would be angry. Instead, the animals helped {animalName} plan a real adventure they could all experience together.",
      learning: "{animalName} discovered that living truthfully created genuine connections with friends who appreciated them for who they really were, not who they pretended to be.",
      moralMessage: "The truth may not always be what others want to hear, but it's always what they need to hear"
    }
  ],
  "Perseverance": [
    {
      introduction: "{animalName} the {animalType} dreamed of reaching the top of the highest mountain in the {habitat}, but everyone said it was impossible for a {animalType}.",
      challenge: "On the first attempt, {animalName} barely made it a quarter of the way before having to turn back. Many animals suggested giving up, saying some dreams are just too big.",
      resolution: "Instead of quitting, {animalName} trained a little each day, learning from each failure and trying new approaches until, step by determined step, they finally reached the summit.",
      learning: "Standing on top of the mountain, {animalName} realized that perseverance had not only achieved the goal but had made them stronger, wiser, and more confident along the way.",
      moralMessage: "Fall seven times, stand up eight – persistence is the path to achievement"
    },
    {
      introduction: "The {description} {animalName} had a special talent for creating beautiful things but always abandoned projects when they became difficult.",
      challenge: "{animalName} started building a bridge across the river that would help all the animals, but the project faced many setbacks – storms washed away their progress, materials broke, and some days it seemed hopeless.",
      resolution: "This time, instead of giving up, {animalName} kept going despite the challenges, rebuilding after each setback with new determination and learning from each mistake.",
      learning: "When the bridge was finally completed, {animalName} understood that the sweetest successes are those that come after overcoming the greatest difficulties.",
      moralMessage: "The difference between a stumbling block and a stepping stone is how you use it"
    }
  ],
  "Teamwork": [
    {
      introduction: "{animalName} the {animalType} was known in the {habitat} for preferring to do everything alone, believing that was the fastest and best way.",
      challenge: "When an enormous fallen tree blocked the main path to the water source, {animalName} tried to move it alone but couldn't budge it an inch, no matter how they used their {specialAbility}.",
      resolution: "Finally accepting help, {animalName} organized the animals into teams, each using their unique strengths. Together, they not only moved the tree but built a useful bridge from it.",
      learning: "Through this experience, {animalName} discovered that teamwork doesn't just solve problems faster – it creates better solutions that no single animal could have thought of alone.",
      moralMessage: "Alone we can do so little; together we can do so much"
    },
    {
      introduction: "In the beautiful {habitat}, {animalName} the {description} {animalType} and the other animals always competed against each other during the harvest season.",
      challenge: "This {season}, the harvest was particularly difficult due to unusual weather, and {animalName} realized that competing as individuals meant many would go hungry.",
      resolution: "{animalName} suggested that instead of each collecting for themselves, they could work as a team, with each animal handling the task they were best at – gathering, carrying, sorting, and storing.",
      learning: "The animals collected more than ever before and finished in record time, showing that when everyone contributes their special talents to a team, amazing things happen.",
      moralMessage: "Individual commitment to a group effort – that's what makes a team work"
    }
  ],
  "Curiosity": [
    {
      introduction: "{animalName} the {animalType} lived in the {habitat} and was always asking questions about everything, which sometimes annoyed the other animals who were content with what they already knew.",
      challenge: "A strange change in the {habitat} puzzled everyone – the water tasted different, plants were wilting, and no one knew why. While others worried, {animalName}'s curiosity led them to investigate.",
      resolution: "By asking questions and carefully observing, {animalName} discovered that something upstream was affecting their water. Their curious nature helped them find and fix the problem, saving their home.",
      learning: "The other animals realized that {animalName}'s curiosity wasn't just an annoying habit – it was a valuable gift that helped their whole community.",
      moralMessage: "The important thing is not to stop questioning; curiosity has its own reason for existing"
    },
    {
      introduction: "The {description} {animalName} was fascinated by the world beyond their {habitat}, always wondering what lay behind the distant hills.",
      challenge: "When strange new tracks appeared near their home, most animals fearfully avoided them. But {animalName}'s curiosity about who made the tracks was stronger than their fear.",
      resolution: "By carefully following the tracks, {animalName} discovered a lost young animal from a different species who needed help finding their family, leading to a wonderful new friendship.",
      learning: "{animalName} realized that curiosity, when balanced with caution, can lead to amazing discoveries and connections that fear would prevent us from finding.",
      moralMessage: "The cure for boredom is curiosity. There is no cure for curiosity – and that's a wonderful thing"
    }
  ],
  "Respect": [
    {
      introduction: "{animalName} the {animalType} thought their way of doing things in the {habitat} was the only right way, and often made fun of how different animals lived, ate, or built their homes.",
      challenge: "When a storm forced {animalName} to shelter with animals they'd previously mocked, they felt uncomfortable and out of place, experiencing for the first time how it felt to be the 'different' one.",
      resolution: "During their time together, {animalName} was surprised to discover clever ideas and valuable wisdom in the very differences they had once ridiculed.",
      learning: "{animalName} learned that respecting differences isn't just about being polite – it's about recognizing that diversity brings strength and wisdom to the whole community.",
      moralMessage: "Respect for others' differences opens doors to new understanding and friendship"
    },
    {
      introduction: "The {description} {animalName} lived in a part of the {habitat} where several different species of animals had their homes, each with their own customs and ways of life.",
      challenge: "Conflicts often arose because each group thought their ways were best. Water usage, noise levels, and territory boundaries became sources of tension and misunderstanding.",
      resolution: "{animalName} organized a gathering where each group could demonstrate their customs and explain why they were important, helping everyone understand the reasons behind the differences.",
      learning: "As respect grew between the groups, they began to appreciate each other's unique contributions to their shared environment, creating a community that was stronger because of its diversity.",
      moralMessage: "Treat everyone with respect, not because of who they are, but because of who you are"
    }
  ],
  "Creativity": [
    {
      introduction: "{animalName} the {animalType} lived in the {habitat} where everything was always done the same way, year after year, because 'that's how it's always been done.'",
      challenge: "When an unexpected change in the weather made their usual food scarce and their traditional shelters inadequate, the animals worried about how they would survive.",
      resolution: "While others panicked, {animalName} began experimenting with new food sources and shelter designs, combining ideas in ways no one had thought of before.",
      learning: "The community discovered that {animalName}'s creative thinking wasn't just fun – it was essential for adapting to new challenges and finding opportunities where others saw only problems.",
      moralMessage: "Creativity is intelligence having fun, and sometimes it's the key to survival too"
    },
    {
      introduction: "The {description} {animalName} was often told that their unusual ideas were a waste of time, but they couldn't stop imagining new possibilities.",
      challenge: "During a particularly harsh {season}, the traditional community gathering couldn't happen in its usual way, leaving everyone feeling sad and disconnected from each other.",
      resolution: "{animalName} used their creativity to design a completely new kind of celebration that would work despite the constraints, incorporating elements that honored tradition while embracing new possibilities.",
      learning: "The community realized that creativity wasn't just about making pretty things – it was about finding new paths forward when old ways no longer worked.",
      moralMessage: "Every child is an artist; the problem is staying an artist when you grow up"
    }
  ],
  "Gratitude": [
    {
      introduction: "{animalName} the {animalType} lived in the beautiful {habitat} but was always focusing on what they didn't have instead of appreciating what was all around them.",
      challenge: "When a temporary drought made the {habitat} less lush than usual, {animalName} complained more than ever, making themselves and everyone around them miserable.",
      resolution: "A wise old animal challenged {animalName} to find three things to be grateful for each day. At first it was difficult, but gradually {animalName} began noticing wonderful things they'd overlooked.",
      learning: "When the rains finally returned, {animalName} realized that their growing gratitude had already made their life richer, regardless of external circumstances.",
      moralMessage: "Gratitude turns what we have into enough and more"
    },
    {
      introduction: "The {description} {animalName} was always rushing from one thing to the next in the busy {habitat}, rarely pausing to notice or appreciate the small wonders of each day.",
      challenge: "After hurting their leg and being forced to slow down, {animalName} felt frustrated and useless, seeing their temporary disability as nothing but a burden.",
      resolution: "With no choice but to move slowly, {animalName} began noticing details they'd missed before – the intricate pattern of leaves, the kindness of neighbors, the peaceful beauty of sunrise.",
      learning: "By the time they healed, {animalName} had developed a habit of gratitude that transformed ordinary days into extraordinary ones, simply by paying attention and giving thanks.",
      moralMessage: "The more you are thankful for what you have, the more you will have to be thankful for"
    }
  ],
  "Adventure": [
    {
      introduction: "{animalName} the {animalType} had lived in the same small corner of the {habitat} their entire life, following the same routine every day and never straying from familiar paths.",
      challenge: "When a mysterious map appeared showing a route to a legendary place, {animalName} felt a strange urge to explore despite their fears of the unknown and the comfortable safety of home.",
      resolution: "Gathering their courage, {animalName} set off on an journey filled with challenges that tested their {specialAbility}, introduced them to new friends, and revealed strengths they never knew they had.",
      learning: "Even after returning home, {animalName} was changed by their adventure, bringing back not just stories but a new confidence and openness to life's possibilities.",
      moralMessage: "Adventure may hurt you, but monotony will kill you"
    },
    {
      introduction: "The {description} {animalName} loved reading about exciting adventures but always found reasons why they couldn't have their own – it was too risky, they weren't prepared enough, or it wasn't the right time.",
      challenge: "When their home in the {habitat} was threatened, the only solution lay across unfamiliar terrain that {animalName} would have to navigate, facing their fears of the unknown.",
      resolution: "With each step beyond their comfort zone, {animalName} discovered that they were more capable than they thought, finding joy in new experiences and unexpected beauty in unfamiliar places.",
      learning: "{animalName} realized that while planning and preparation have their place, sometimes the greatest adventures begin with a single brave step into the unknown.",
      moralMessage: "Life is either a daring adventure or nothing at all"
    }
  ],
  "Nature": [
    {
      introduction: "{animalName} the {animalType} lived in the beautiful {habitat} but had started taking their home for granted, forgetting to care for it properly.",
      challenge: "Gradually, {animalName} noticed changes – fewer flowers bloomed, the water wasn't as clear, and some animal friends had moved away. Something was happening to their beloved home.",
      resolution: "Determined to make a difference, {animalName} began small acts of stewardship – planting seeds, clearing debris from the stream, and teaching young animals about respecting their environment.",
      learning: "As the {habitat} slowly renewed itself, {animalName} understood that nature's gifts require our care and protection, and that even small actions can make a meaningful difference.",
      moralMessage: "We don't inherit the earth from our ancestors; we borrow it from our children"
    },
    {
      introduction: "The {description} {animalName} had always been fascinated by the incredible web of life in their {habitat} – how each plant, insect, and animal played an important role.",
      challenge: "When newcomers to the area began changing the landscape without understanding these connections, {animalName} worried about the balance being disrupted but wasn't sure how to explain its importance.",
      resolution: "{animalName} created a special tour that showed how everything was connected – how certain plants fed insects that pollinated flowers that produced fruits that fed animals who scattered seeds.",
      learning: "Both {animalName} and the newcomers gained a deeper appreciation for the delicate balance of nature and how each creature, no matter how small, has an essential role to play.",
      moralMessage: "In nature, nothing exists alone"
    }
  ],
  "Dreams": [
    {
      introduction: "{animalName} the {animalType} had a dream that seemed impossible – something no {animalType} had ever done before. Many animals in the {habitat} told them to be realistic and focus on ordinary goals.",
      challenge: "Despite discouragement, {animalName} couldn't let go of their dream, but finding a path forward seemed impossible with so many obstacles and so little support from others.",
      resolution: "By breaking their big dream into smaller steps and finding the few supportive friends who believed in possibilities, {animalName} made slow but steady progress toward what once seemed impossible.",
      learning: "{animalName} discovered that dreams aren't just pleasant fantasies – they're the vision of what could be that gives us direction and purpose, even when the journey is difficult.",
      moralMessage: "A dream doesn't become reality through magic; it takes determination and hard work"
    },
    {
      introduction: "The {description} {animalName} had vivid dreams at night of flying high above the {habitat}, seeing wonders no other animal had ever witnessed.",
      challenge: "During the day, {animalName} tried to describe these magnificent visions to others, but many animals dismissed them as silly or impossible, making {animalName} doubt the value of their dreams.",
      resolution: "Instead of giving up on their dreams, {animalName} began expressing them through art, creating beautiful images that inspired other animals to share their own dreams and visions.",
      learning: "Through this experience, {animalName} and their community learned that dreams – whether sleeping or waking – expand our sense of what's possible and connect us to our deepest hopes.",
      moralMessage: "All our dreams can come true if we have the courage to pursue them"
    }
  ]
};

/**
 * Get a random thematic plot for the specified theme
 */
export function getThematicPlot(theme: string): ThematicPlot {
  // If we have plots for this theme, randomly select one
  if (thematicPlots[theme] && thematicPlots[theme].length > 0) {
    const plots = thematicPlots[theme];
    return plots[Math.floor(Math.random() * plots.length)];
  }
  
  // If no plots found for this theme, create a generic one
  return {
    introduction: "Once upon a time in a beautiful land, there lived a special animal named {animalName} the {animalType}, who was known for being very {description}.",
    challenge: "One day, something unusual happened that presented {animalName} with a difficult challenge. It wasn't going to be easy to solve this problem.",
    resolution: "After much thought and effort, {animalName} found a creative solution by using their {specialAbility} in a way they never had before.",
    learning: "Through this experience, {animalName} learned an important lesson about life and about themselves.",
    moralMessage: "The most valuable lessons often come from our greatest challenges"
  };
}
