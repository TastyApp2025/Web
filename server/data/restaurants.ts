// Manual restaurant data - easily editable
// Add your restaurants here with image URL links (from Unsplash, Pexels, etc.)

export interface Restaurant {
  id: string;
  name: string;
  location: string;
  type: string;
  description: string;
  image: string;
  mapLink: string;
  address?: string;
  phone?: string;
  website?: string;
  hours?: string;
  priceRange?: string;
  review?: string;
  rating?: number;
  altText?: string;
}

export const restaurants: Restaurant[] = [
  {
    id: "addis-cape-1",
    name: "Addis in Cape Ethiopian Restaurant",
    location: "Cape Town, South Africa",
    type: "Ethiopian",
    description: "Authentic Ethiopian cuisine with traditional flavors and communal dining experience.",
    image: "https://lh3.googleusercontent.com/p/AF1QipMC95iHhhFfZXrf0N0k6qwAJaWwA-7rcadqy7ac=s680-w680-h510-rw",
    mapLink: "https://maps.google.com/maps?q=Addis+in+Cape+Ethiopian+Restaurant+Cape Town",
    address: "168 Loop St, CBD, Cape Town, 8001",
    phone: "076 846 0929",
    website: "https://addisincape.co.za",
    hours: "Daily 12–10:30 pm",
    priceRange: "R 200–300+",
    rating: 4.5,
    altText: "Addis in Cape Ethiopian Restaurant entrance with traditional decor and dining ambiance",
    review: "Addis in Cape is one of those restaurants that stays with you long after the meal is over, not just for the food, but for the experience as a whole.\n\nEthiopia's rich and ancient cultural heritage is beautifully reflected in every detail of the space. The décor feels intentional, thoughtful, and deeply respectful of tradition, nothing ornamental for the sake of it. This is a restaurant that understands where it comes from.\n\nThe low wooden chairs and small, round tables are arranged for shared dining, mirroring the Ethiopian tradition of communal eating. It's surprisingly comfortable. There's no room for distractions, no place for your phone on the table. Conversation becomes inevitable. Encouraged, even.\n\nAfter being seated, I ordered my meal and was presented with a handwash—an understated but essential ritual, reminding you that this is food meant to be eaten with your hands. It sets the tone.\n\nThe food arrived on a mesob, a traditional woven basket table, generously lined with injera. What followed was a feast:\n\nMisir Wot, split red lentils slow-cooked with berbere, rich and warming\nKik Alicha, yellow lentils gently cooked with garlic, onion, and turmeric\nPumpkin Alicha, soft and subtly spiced\nKai Sega Wot, spicy beef simmered in berbere, deep, fiery, and complex\nDoro Alicha, slow-cooked chicken with garlic, turmeric, and kibe (Ethiopian spiced butter), fragrant and deeply comforting\n\nAll of this was accompanied by a fresh tomato salsa and beautifully prepared seasonal vegetables.\n\nThe food was earthy, rich, and layered with warmth. The injera is soft, spongy, slightly tangy and was the perfect vehicle for everything on the table. I wrapped each bite carefully, and somewhere between mouthfuls, I forgot I was in Cape Town altogether. This was transportive food. Honest food. Some of the best I've eaten.\n\nI ended the meal with the traditional Ethiopian coffee ceremony, served with popcorn—unrushed, ceremonial, and deeply satisfying. A moment rather than a beverage.\n\nGood food is one thing. Good food paired with a meaningful experience is something else entirely. Addis in Cape is a rare gem, a restaurant that understands that dining is about connection, culture, and memory.\n\nIt will forever stand as one of my favorite restaurants, and one I recommend without hesitation. The food, the service, and the people are all top-tier.",
  },
  {
    id: "seven-colours-1",
    name: "Seven Colours Eatery",
    location: "Cape Town, South Africa",
    type: "Eatery",
    description: "Vibrant eatery offering contemporary cuisine in a colorful, welcoming atmosphere.",
    image: "https://lh3.googleusercontent.com/p/AF1QipNwEi0s1xhp2BhRqVUllhgual7IkshSMcz6f-2m=s680-w680-h510-rw",
    mapLink: "https://maps.google.com/maps?q=Seven+Colours+Eatery+Cape+Town",
    address: "Battery Park, V&A Waterfront, Cape Town, 8001",
    phone: "+27 87 265 8762",
    website: "https://www.sevencolourseatery.co.za",
    hours: "Daily, 9:00 AM - 10:00 PM",
    priceRange: "$$",
    rating: 4.3,
    altText: "Seven Colours Eatery entrance with traditional South African decor and dining ambiance",
    review: "Seven Colours Eatery, tucked into Battery Park at the V&A Waterfront, is the kind of place that doesn't try to reinvent anything. It doesn't need to. What it does instead is far more compelling — it returns to something familiar, something rooted, and does it exceptionally well.\n\nThis is not just a restaurant; it's a tribute to South African home cooking. The concept is simple but deliberate: recreate the feeling of a proper Sunday meal, the kind that gathers people around a table and keeps them there longer than expected. Everything about the space and the approach leans into that idea of comfort and cultural memory.\n\nThe menu centers around the iconic 'seven colours' plate, a spread that reflects the diversity and balance of a traditional South African meal. On one plate, you'll find creamy samp, slow-cooked and hearty; spinach that's rich and comforting; chakalaka with just the right level of spice; fresh coleslaw; sweet beetroot; and a protein of your choice. The hard body chicken (uMleqwa) stands out — firm, deeply flavorful, and cooked with patience. It's the kind of dish that reminds you why slow cooking matters.\n\nThere's also the braai plate, which brings the unmistakable flavor of shisanyama indoors. The steak is well prepared, the sausage carries that smoky, familiar taste, and together they deliver something that feels both casual and carefully done.\n\nWhat stands out most is the attention to flavor. The seasoning is confident but not overwhelming. Everything tastes complete as it arrives — no need to adjust, no need to add. It's food that knows exactly what it's doing.\n\nThe ingredients feel fresh, the cooking feels intentional, and the overall experience lands somewhere between restaurant dining and being invited into someone's home. There's a sense of pride in what's being served, and it shows.\n\nMore than anything, Seven Colours Eatery reminds you of the value in exploring your own food culture. It doesn't present anything as exotic or unfamiliar — it presents it as it is: meaningful, layered, and worth appreciating.\n\nThe service is warm, the atmosphere is relaxed but thoughtful, and the food leaves a lasting impression. Not because it surprises you, but because it connects with something familiar and gets it exactly right.\n\nIt's the kind of place you leave already thinking about when you'll return.",
  },
  {
    id: "idiot-sandwich-1",
    name: "The Idiot Sandwich Café",
    location: "Cape Town, South Africa",
    type: "Café",
    description: "Cozy café known for creative sandwiches and great coffee in a relaxed setting.",
    image: "/idiot-sandwich.png",
    mapLink: "https://maps.google.com/maps?q=The+Idiot+Sandwich+Cafe+Cape+Town",
    address: "186 Lower Main Rd, Observatory, Cape Town",
    phone: "",
    website: "https://www.instagram.com/idiotsandwichcafe?igsh=MTBiNzlvemdxejhtcQ==",
    hours: "Daily 8 am–5 pm",
    priceRange: "R 100–200",
    rating: 4.4,
    altText: "The Idiot Sandwich Café entrance with café-style decor and dining ambiance",
    review: "The Idiot Sandwich Café by Charlton is a cosy, no-frills café where the focus is exactly where it should be: on the food. It's an unpretentious space, thoughtfully curated by a chef who clearly understands that good food doesn't need theatrics. This is a new kid on the block, but one with serious potential.\n\nI ordered the roast pork belly sandwich with truffle cream cheese, apple slaw, and cheddar. This is one of those chef sandwiches—carefully considered, built with intention, and made for those of us who appreciate the finer details. The pork belly was perfectly cooked: rich, tender, and indulgent. The fresh apple slaw brought acidity and sweetness, cutting through the fat exactly where it needed to. Every bite made sense. It's a beautiful sandwich, and easily one of my favourites at The Idiot Sandwich.\n\nI also tried the crispy chicken schnitzel sandwich with guacamole, tomato, mozzarella, and pickled onions. Another well-executed creation—balanced, satisfying, and packed with flavour. If I look past the slightly over-toasted focaccia on this occasion, it's still a definite must-try. All the sandwiches are built on freshly baked focaccia, which when done right, ties everything together beautifully.\n\nWhat stands out most about The Idiot Sandwich and the chef behind it is sincerity. This is someone who is serious about food. You can feel the passion in every element, from the combinations to the execution. There's confidence here, but also care.\n\nThis has quickly become one of my favourite spots to eat in Cape Town, and I suspect it will be for many others too. Go check out The Idiot Sandwich Café—it's honest food, done properly.",
  },
  {
    id: "andalousse-1",
    name: "Andalousse Moroccan Restaurant",
    location: "Cape Town, South Africa",
    type: "Moroccan",
    description: "Exotic Moroccan flavors served in an authentically decorated restaurant with traditional ambiance.",
    image: "https://lh3.googleusercontent.com/p/AF1QipMn3OdCZtmr0DdSs7SrnWICtv_yBjWUuQSJh6k=w289-h312-n-k-no",
    mapLink: "https://maps.google.com/maps?q=Andalousse+Moroccan+Restaurant+Cape+Town",
    address: "2 Jarvis St, Green Point, Cape Town, 8001",
    phone: "021 433 1820",
    website: "https://andalousse.com",
    hours: "Daily 12–11 pm",
    priceRange: "R 200–300",
    rating: 4.6,
    altText: "Andalousse Moroccan Restaurant entrance with traditional Moroccan decor and ambiance",
    review: "Andalousse is a casual Moroccan–Middle Eastern restaurant serving traditional dishes inspired by the cuisine of Morocco, easily one of my top five cuisines in the world.\n\nMr. Moosa, the owner, did not disappoint. I arrived unprepared for what followed, much like the first time I ate at Addis in Cape Town when expectations are low, and the food quietly changes your mood, your pace, your night. Andalousse is modest, almost understated. At first glance, there's nothing screaming for attention. This is not a place that sells itself on décor. It waits for the food to do the talking.\n\nAnd talk it did.\n\nMy meal began with dishes I hadn't ordered. Somewhere in an earlier conversation, Mr. Moosa had decided I needed to experience more than I'd planned. The waiter arrived with a bowl of warm harissa soup, compliments of the house. Rich, comforting, gently spicy. The kind of soup that settles you into your chair and tells you you're in good hands.\n\nSoon after came the mezze: fresh, vibrant, exactly what good mezze should be. Bright flavors, balanced, generous. The standout was the harissa flatbread—perfectly cooked, cheese grilled on top, finished with fresh coriander. It was simple, soulful, and deeply satisfying. That bread gave me life.\n\nThen the main event: a lamb shank tagine with vegetables, couscous, and chickpeas. The lamb fell effortlessly off the bone. The vegetables were soft to the point where some might call them overcooked, but in a tagine, this is perfection. Everything had melted together, slow-cooked into harmony. It was deeply flavorful, comforting, and unmistakably Moroccan.\n\nThe meal ended with complimentary mint tea and biscuits baked by Mr. Moosa's wife. A small, personal touch that said everything about the place. I was full. I was content. I was genuinely happy.\n\nI take pride in paying for my meals and giving honest feedback. While I was thoroughly spoiled this evening, I still insisted on paying for half the meal and the rest was kindly comped by Andalousse. That gesture speaks volumes about the culture here: generosity without expectation, hospitality without pretense.\n\nAndalousse is not a restaurant you visit once. It's a place you return to monthly, instinctively, when you want food that feels real. It's a must try, and without question one of my favorites.\n\nThank you to Mr. Moosa and his team. The ambiance, the service, and most importantly, the food were exceptional.",
  },
];
