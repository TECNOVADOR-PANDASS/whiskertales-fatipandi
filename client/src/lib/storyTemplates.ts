interface StoryTemplate {
  id: number;
  content: string;
}

/**
 * Story templates that form the base structure of the generated stories
 */
const storyTemplates: StoryTemplate[] = [
  {
    id: 1,
    content: `Once upon a time, as {timeOfDay} settled over the {habitat}, there lived a {description} {animalType} named {animalName}. {animalName} was known throughout the land for their {specialAbility}, which made them quite special among all the animals.

It was a beautiful {season} evening, with {weather} creating a magical atmosphere. {childName} was just about to fall asleep when they noticed a gentle tapping at their window. Curious, they peeked through the curtains to find {animalName} the {animalType} looking back at them with bright, intelligent eyes.

"Hello, {childName}," said {animalName} in a soft voice. "I've come to share an adventure with you. Would you like to join me tonight?"

{childName} couldn't believe their ears! A talking {animalType}! And one that knew their name! Without hesitation, {childName} nodded excitedly.

"Wonderful," {animalName} {sound}. "Hold my paw and close your eyes. When you open them, you'll be in my world."

{childName} did as they were told, and when they opened their eyes, they found themselves in the most beautiful {habitat} they had ever seen. It was filled with twinkling lights, whispering trees, and the gentle sounds of nature at night.

"{plotIntro}" explained {animalName} as they led {childName} along a moonlit path.

As they walked, {animalName} shared a fascinating fact: "{funFact}." {childName} was amazed by this information and eager to learn more about their new friend.

The path took them deeper into the {habitat}, where the trees grew taller and the moonlight created dancing patterns on the ground. {animalName} {sound} and pointed ahead to a small clearing.

"{plotChallenge}" {animalName} said, looking worried.

{childName} thought for a moment. "Maybe I can help," they offered, feeling brave in this magical place.

Together, {childName} and {animalName} approached the challenge. It wasn't going to be easy, but {childName} noticed how {animalName} used their {specialAbility} in clever ways. They worked side by side, using both human creativity and animal wisdom.

At one particularly difficult moment, {animalName} {sound} and said, "Remember, {childName}, sometimes the biggest challenges bring the greatest rewards."

After much effort and teamwork, they finally succeeded! {plotResolution}

Sitting together under a canopy of stars, {animalName} turned to {childName} with wise eyes. "{plotLearning}"

{childName} nodded thoughtfully, understanding the important lesson. They spent the rest of the evening exploring the magical {habitat}, meeting {animalName}'s friends, and learning about life in this special place.

As the first light of dawn began to appear on the horizon, {animalName} led {childName} back to the path where they had first arrived.

"It's time for you to return home now," said {animalName} gently. "But remember what you learned tonight, and know that whenever you dream, I'll be waiting to share new adventures with you."

{childName} gave {animalName} a warm hug, grateful for the adventure and the friendship. "I'll remember everything," they promised.

Once more, {childName} closed their eyes, and when they opened them, they were back in their own bedroom, tucked safely in bed. Was it all just a dream? Perhaps. But on the windowsill sat a small, perfect leaf from the {habitat}, sparkling with just a touch of magic – a reminder that some dreams are more real than they seem.`
  },
  {
    id: 2,
    content: `In the heart of a {description} {habitat}, where {weather} created a magical atmosphere during {timeOfDay}, lived a remarkable {animalType} named {animalName}. Unlike other {animalType}s, {animalName} possessed an extraordinary {specialAbility} that made the other animals watch in wonder.

One {season} evening, as {childName} was drifting off to sleep, a gentle breeze carried the sweet scent of adventure through their window. Suddenly, the bedroom was filled with a soft, shimmering light, and there stood {animalName} the {animalType}, eyes twinkling with mischief and magic.

"Are you asleep yet, {childName}?" whispered {animalName}.

{childName} rubbed their eyes in disbelief. "I must be dreaming," they murmured.

{animalName} {sound}. "Dreams are just another kind of adventure," they said with a smile. "Would you like to join me in the Whisper Woods tonight? There's something important happening, and I could use a human friend's help."

Before {childName} could fully process what was happening, they found themselves transported to an enchanted forest, where flowers glowed like tiny lanterns and trees swayed in greeting.

"Welcome to my home," said {animalName} proudly. "Did you know that {funFact}? That's how I found you – I could sense you were the perfect friend for tonight's adventure."

As they ventured deeper into the magical woodland, {animalName} explained the situation. "{plotIntro}"

{childName} listened carefully, feeling both excitement and a little nervousness about the adventure ahead. The forest grew denser, and the path narrowed until they reached a moonlit clearing where several other animals had gathered, all looking worried.

"Here's what's happening," {animalName} explained to everyone. "{plotChallenge}"

The animals all began talking at once, suggesting different solutions, but none seemed quite right. {childName} sat quietly, observing everything carefully. They noticed patterns and possibilities that the animals, with their different way of seeing the world, had missed.

"I think I might have an idea," {childName} said shyly.

All the animals turned to look at the human child in their midst. {animalName} {sound} encouragingly.

"Go on, {childName}," they urged. "Sometimes the freshest perspective comes from someone new."

Gathering their courage, {childName} explained their plan. It would require everyone's help, using each animal's unique abilities in creative ways. {animalName} would need to use their {specialAbility} at just the right moment.

Working together through the night, the animals and {childName} implemented the plan. There were moments of doubt and difficulty, times when it seemed like they might fail, but {animalName} kept everyone's spirits up.

"Even in the darkest forest," {animalName} would say, "the moonlight finds a way to shine through."

Finally, after much effort and teamwork, success! {plotResolution}

The animals celebrated joyfully, thanking {childName} for their help. As they shared a feast of forest fruits and honey, {animalName} took {childName} aside.

"You've learned something important tonight, haven't you?" asked the wise {animalType}.

{childName} nodded thoughtfully. "{plotLearning}"

{animalName} {sound} with approval. "That's exactly right. And that's why I chose you for this adventure."

As the night began to fade into dawn, {animalName} led {childName} back through the forest. The path seemed to shimmer beneath their feet, sprinkled with morning dew and magic.

"Will I ever see you again?" {childName} asked, not wanting the adventure to end.

"Look for me in your dreams," {animalName} replied gently. "And remember, the most magical adventures often happen right where you are, if you only look at the world with wonder."

With one last nuzzle, {animalName} {sound} farewell, and {childName} found themselves back in their bed, just as the first rays of sunlight peeked through the curtains.

On their bedside table sat a small, perfect feather (or leaf, or stone) that certainly hadn't been there the night before – a small token from a magical {habitat}, and a reminder that some dreams are more than just dreams.`
  },
  {
    id: 3,
    content: `In a land not so far away, where {weather} painted the skies during {timeOfDay}, there lived a most unusual {animalType}. This {animalType}, named {animalName}, had {description} features and a heart full of wonder. What made {animalName} truly special was their remarkable {specialAbility}, which they used to help all the creatures of the {habitat}.

It was a {season} night when the stars seemed to dance especially brightly over {childName}'s home. Unable to sleep, {childName} was gazing out their window when something extraordinary caught their eye – a trail of softly glowing footprints leading from their garden into the woods beyond.

Curiosity overcame caution, and {childName} slipped out of bed, put on their slippers, and followed the mysterious trail. The footprints led to an ancient oak tree where, to {childName}'s amazement, {animalName} the {animalType} sat waiting.

"I've been hoping you'd come," said {animalName}, eyes gleaming with intelligence. "I've been watching you for some time, {childName}, and I think you're exactly who we need tonight."

{childName} gasped. "You can talk! And... you know my name?"

{animalName} {sound} softly. "There's much more magic in the world than most humans remember to see. Tonight, I need to show you something important. Will you trust me?"

Hesitantly at first, then with growing excitement, {childName} nodded. {animalName} touched their nose to {childName}'s hand, and suddenly the world around them transformed. The trees grew taller, the flowers brighter, and {childName} could understand the whispers of the wind and the conversations of crickets.

As they journeyed through this enchanted version of the familiar woods, {animalName} shared incredible knowledge: "{funFact}" they explained, as they navigated by starlight.

Soon they reached a beautiful meadow bathed in moonlight, where animals of all kinds had gathered in a circle. They fell silent as {animalName} and {childName} approached.

"Friends," announced {animalName}, "this is {childName}, the human child I told you about. {childName}, these are the Guardians of the {habitat}."

An elderly owl nodded respectfully. "Welcome, young one. {animalName} believes you can help us, and we trust their judgment."

{animalName} explained to {childName}, "{plotIntro}"

The assembled animals looked worried as {animalName} continued, "{plotChallenge}"

{childName} felt the weight of the animals' hopes resting on their shoulders. It was both frightening and exciting to be needed this way. Together with {animalName}, they began to form a plan, combining human ingenuity with animal wisdom.

The night grew deep as they worked. At times, {animalName} would use their {specialAbility} in ways that amazed {childName}, while {childName} contributed ideas that would never have occurred to the animals.

"Humans and animals see the world so differently," {animalName} observed. "That's why we need both perspectives to solve this problem."

After facing many challenges and overcoming unexpected obstacles, they finally succeeded. {plotResolution}

As dawn approached and the animals celebrated their triumph, {animalName} took {childName} to a quiet spot beside a gently flowing stream.

"There's a reason I chose you for this adventure," {animalName} said softly. "{plotLearning}"

{childName} felt something shift inside them – a new understanding that they would carry forever.

"It's time to go home now," {animalName} said as the first golden rays of sunrise touched the trees. "But this connection between us remains. Whenever you see a {animalType} or visit the woods, remember tonight."

{animalName} {sound} gently and touched their nose to {childName}'s forehead. In a swirl of morning mist, {childName} found themselves back in their own garden, wondering if it had all been just an elaborate dream.

But in their pocket was a small token – a perfect acorn cap filled with what looked like stardust – proof that some dreams walk the line between imagination and reality, especially on magical nights when the barrier between worlds grows thin.`
  }
];

/**
 * Get a random story template
 */
export function getStoryTemplate(): StoryTemplate {
  return storyTemplates[Math.floor(Math.random() * storyTemplates.length)];
}
