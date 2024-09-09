import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Container, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { Toaster, toast } from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './HistoricalContent.css';
import curse1 from '../../Assets/curse1.jpeg'
import curse2 from '../../Assets/curse2.jpg'
import capstone1 from '../../Assets/capstone1.png'
import capstone2 from '../../Assets/capstone2.jpeg'
import build1 from '../../Assets/build1.jpg'
import build2 from '../../Assets/build2.jpg'
import cat1 from '../../Assets/cat.jpg'
import cat2 from '../../Assets/cat2.jpg'
import isis1 from '../../Assets/isis.jpg'
import isis2 from '../../Assets/isis2.jpg'
import mummy1 from '../../Assets/mummy1.jpg'
import mummy2 from '../../Assets/mummy2.jpg'

const data = [
    {
        title: "The Curse of King Tut’s Tomb",
        reference: "https://beyondkingtut.com/the-curse-of-king-tuts-tomb/",
        description: [
            `When King Tutankhamun died over 3,000 years ago, his body was sealed in a tomb within the Valley of the Kings. It remained buried and untouched until it was unsealed by archaeologist Howard Carter in 1922. There have been rumors since then that Tut’s tomb was protected by the curse of the pharaoh, which would take the life of anyone who disturbed Tut’s final resting place.`,
            `Not long after the tomb was opened, Carter’s benefactor Lord Carnarvon suddenly died. This may have given birth to the story of the curse, though it doesn’t explain how Carter himself lived nearly two more decades before his death in 1939. The truth of Carnarvon’s demise was that he was already in poor health at the time the tomb was opened. Experts have even stated that the sanitary conditions would have been better within the tomb than outside it, meaning that Carnarvon was likely safer when he was within the tomb’s walls.`,
            `Another potential origin story for the curse is that when Howard Carter and his team made their way through the tomb, they encountered a statue of the god of the dead Anubis standing guard over the Boy King’s burial chamber. At the statue’s feet was a small brick inscribed with a warning, likely to ward off grave robbers. It is possible that this inscription could have inspired the story of the curse.`,
            `Egyptologist Dominic Montserrat had a different theory for the origin – that it came about long before the discovery of Tut’s tomb. His research concluded that a likely origin for the myth came after a stage show that removed the wrappings of authentic mummies inspired stories of a curse of mummified bodies out for revenge.`,
            `Although the curse itself is only superstition, it lives on in pop culture as a part of King Tut’s story.`
        ],
        images: [curse1, curse2]
    },
    {
        title: "The Missing Capstone of the Great Pyramid",
        reference: "https://www.dawn.com/news/1079617",
        description: [
            `It has long been assumed that the Great Pyramid at Giza, Egypt, had a top that is no longer there, which means though the pyramid looks like a perfect four-sided triangular structure, it is not absolutely pointed at the top like a triangle, but is flat at the top — at least 30 feet of flat walking space at the summit for people who have climbed to the top and measured it.`,
            `According to ancient tradition, the capstone or the top of the pyramid is added to the structure after it is almost completed just before the top. It is said to be the same shape but smaller to finish off the shape. And it is supposed to be the most important piece that gives the pyramid its actual purpose. There have been many speculations and assumptions through the ages as people have tried to understand what happened to the capstone of the Great Pyramid.`,
            `First of all, no one knows if there really was one. Yes, there are some who say that it was never there. But then, according to ancient knowledge and legends, if the capstone did not exist what was the exact purpose of building the huge monument that took so much effort and time?`,
            `Since the time of Christ, people who came to look at this huge monument stated, according to some records, that it was missing its capstone. And so, the question comes down from centuries because the ancient people knew that there was no purpose to it without the capstone. Also, it is believed that the capstone was either made of gold or covered by a layer of gold.`,
            `The reason? That too is an enigma. While mostly researchers believe it was to show the riches and glory of the pharaohs, others say there was another and more important purpose. The metal absorbed the sun’s energies and was used as the main part of the entire structure and made it work like turning the key to a machine. The whole pyramid was actually covered with polished limestone and with its golden capstone; it shone at night like a bright star on Earth, which would have been visible from space!`,
            `According to the Egyptian authorities, there seems to be no confusion to the matter. They claim that the Great Pyramid was built as a tomb for the pharaoh Cheops, some 2,500 years ago and the capstone was looted by thieves who also stole many other relics and treasures from the pyramids. But here, dear friends, is what we call the more interesting theory; that the Great Giza is much older, that it is not a tomb but a machine that was used for a much more higher and important purpose and that it was the capstone that turned it on. And here is the basis of that theory.`,
            `The pyramid has encoded information about the form and function of the universe. The reason it was made with the hardest of stones was because it needed to stand the test of time. There are no hieroglyphs or inscriptions inside the pyramid as thought previously. Just on the outside. It was built by an ancient civilisation that brought with itself the knowledge that had died with Atlantis. Which is the reason that even with today’s cutting edge scientific technology, it is not possible to build one this size and so precise. The length, base and diameter, all represent the geometric measurements of planet Earth. It’s circumference, diameter and surface area.`,
            `The imaginary numbers of the Greek Pi and Phi are both represented here. The inner rooms and chambers do not make sense in the “tomb” theory. In fact, the relation of the rooms to one another, the material used in their construction and the descending and ascending stairways tell another story. But what story? Researchers can only speculate.`,
            `So the Great Pyramid at Giza was a machine that cannot work without its capstone. But what did this machine do? That is a “13-acre, six-million tonne mystery”, according to experts.`,
            `Interestingly, the Egyptian government planned to top the Great Pyramid with a golden capstone as part of its turn of the millennium celebrations at Giza. All were excited and looked forward to the ceremony.`,
            `Then suddenly, without any explanation, when the time came, the ministry involved cancelled its plan.`,
            `Why? Did someone warn them of the consequences of turning on the most advanced and oldest machine on the planet? Moreover, they might also have considered that there have been changes over the centuries. Electric lights and bulbs have been installed. Would that have altered or endangered the workings? They are not telling. But there is a certain form of energy still at the top as discovered by Sir Siemens, a British inventor who climbed to the top with his Arab guides many years ago.`,
            `He stood in the centre and spread out his hands and heard a kind of ringing noise. He wrapped a wet newspaper around a bottle and held it over his head. The bottle became charged with electricity and sparks started coming out. When he pointed it towards one of his guides, the man got shocked and fell to the ground. What is it capable of is a looming mystery. As large or even larger than the structure itself.`
        ],
        images: [capstone1, capstone2]
    },
    {
        title: "New Discovery Shows What Helped the Ancient Egyptians Build the Pyramids",
        reference: "https://newatlas.com/science/pyramids-egyptians-nile-river-branch/",
        description: [
            `Scientists have discovered that the ancient Egyptians may have had help building the pyramids after all – not from aliens, but a long-lost river. Evidence of a previously uncharted branch of the Nile has been found snaking along near dozens of pyramids, lending credence to the idea that blocks were floated to the work sites.`,
            `The question of how an ancient civilization managed to move huge stone blocks great distances to build monuments has perplexed the world for thousands of years. Floating them on rafts down rivers is one of the most plausible and widely believed hypotheses, but there’s still one problem: the Nile is many kilometers away from where the pyramids were built.`,
            `At least, it is currently. A new study suggests that the river was once much closer, but this branch has long since dried up. Using a combination of satellite imagery, geophysical surveys and analysis of sediment samples, the researchers claim to have now mapped out this ancient river branch. They propose the name “Ahramat,” which means pyramids in Arabic.`,
            `According to the study, the Ahramat branch extended about 64 km (40 miles) in a north-south direction, roughly parallel to the modern Nile but between 2.5 and 10.25 km (1.6 and 6.4 miles) west of it. It was between 2 and 8 m (6.6 and 26.2 ft) deep, and 200 to 700 m (656 to 2,297 ft) wide, which are similar dimensions to the current river.`,
            `Importantly, this old man river seems to have weaved its way past dozens of pyramid sites. Many of them had causeways that end in small structures right where the riverbanks of the Ahramat branch were proposed to have been, suggesting these were acting as docks.`,
            `“Many of us who are interested in ancient Egypt are aware that the Egyptians must have used a waterway to build their enormous monuments, like the pyramids and valley temples, but nobody was certain of the location, the shape, the size, or proximity of this mega waterway to the actual pyramids site,” said Professor Eman Ghoneim, lead author of the study. “Our research offers the first map of one of the main ancient branches of the Nile at such a large scale and links it with the largest pyramid fields of Egypt.”`,
            `So what happened to the Ahramat? The short answer is time – it’s been well over 2,000 years since the last pyramid was built in the area, and that’s plenty of time for the river to migrate eastward. Constant winds depositing sand into the channel could have dried it up, floods could have deposited other sediments into it, or plate tectonics could have diverted it towards its current path.`,
            `The discovery could help paint a more accurate picture of life in ancient Egypt, adds context to unexplained structures or texts, and could direct teams to new sites for archeological excavations.`
        ],
        images: [build1 , build2]
    },
    {
        title: "The Guardian Cat of Philae Temple",
        reference: "https://www.alwatan.com/article/123456",
        description: [
            `With stern features, a piercing gaze, and confident steps, the cat roams inside the Philae Temple in Aswan. It waits for food from Egyptian and foreign tourists and spends its nights in the temple, as if declaring its guardianship over this timeless Pharaonic monument in Aswan. Tourists are captivated by its appearance and take various souvenir photos of it as it strolls through the temple. Unlike other cats, it is accustomed to the flash of cameras and is not disturbed by it, always posing with pride and strength before the lenses.`,
            `Jessie Ismail, a photographer, saw the guardian cat during one of her visits to the Philae Temple in Aswan as part of her tourist trips. She recalls the first time she saw it was at its birth, and during her subsequent nine visits to Aswan, she witnessed the guardian cat at different stages of its life.`,
            `She noted that the guardian cat does not usually appear in crowds; it avoids them but does not fear tourists or people when being photographed, unlike the other cats in the temple. This particular cat is distinguished by its rare color, unique breed, wide eyes, and its proud stance during photography.`,
            `Mahmoud Farouk, the head worker at the Karnak Temple, affirms the ancient Egyptians' connection with various animals, especially domestic ones like cats and dogs. He explains that the ancient Egyptians revered these animals, even deifying some, such as the gods Anubis and Bastet, who resembles a cat. Farouk confirms that the cats and dogs in the Karnak Temple in Luxor rely heavily on food from tourists and Egyptians during their stay at the temple.`
        ],
        images: [cat1, cat2]
    },
    {
        title: "The Story of Isis and Osiris",
        reference: "https://kids.britannica.com/kids/article/Isis-and-Osiris/353306",
        description: [
            `Isis and Osiris were among the most important gods in ancient Egyptian mythology. Osiris was the god of the dead. He was also the god of crops and plentiful growth. Isis was his wife and sister. She was a mother goddess believed to have great magical powers. Isis and Osiris had a son named Horus. The Egyptians considered Isis and Horus to be the perfect mother and child.`,
            `According to legend, Osiris and Isis had a brother named Seth (or Set). Seth was a god of violence and disorder. He tricked Osiris into climbing into a wooden box. When Osiris climbed in, Seth slammed the lid shut. He threw the box into the Nile River, sending Osiris to his death.`,
            `Stories tell that Isis mourned her husband’s death deeply. She recovered Osiris’ body and buried him. Isis then used her great magic to give new life to Osiris. From then on, he was considered the ruler of the land of the dead, or underworld. Osiris was said to grant people life after death in the underworld.`
        ],
        images: [isis1, isis2]
    },
    {
        title: "The Mummification Process",
        reference: "https://www.si.edu/spotlight/ancient-egypt/mummies",
        description: [
            `The mummification process took seventy days. Special priests worked as embalmers, treating and wrapping the body. Beyond knowing the correct rituals and prayers to be performed at various stages, the priests also needed a detailed knowledge of human anatomy. The first step in the process was the removal of all internal parts that might decay rapidly. The brain was removed by carefully inserting special hooked instruments up through the nostrils in order to pull out bits of brain tissue. It was a delicate operation, one which could easily disfigure the face. The embalmers then removed the organs of the abdomen and chest through a cut usually made on the left side of the abdomen. They left only the heart in place, believing it to be the center of a person's being and intelligence. The other organs were preserved separately, with the stomach, liver, lungs, and intestines placed in special boxes or jars today called canopic jars. These were buried with the mummy. In later mummies, the organs were treated, wrapped, and replaced within the body. Even so, unused canopic jars continued to be part of the burial ritual.`,
            `The embalmers next removed all moisture from the body. This they did by covering the body with natron, a type of salt which has great drying properties, and by placing additional natron packets inside the body. When the body had dried out completely, embalmers removed the internal packets and lightly washed the natron off the body. The result was a very dried-out but recognizable human form. To make the mummy seem even more life-like, sunken areas of the body were filled out with linen and other materials and false eyes were added.`,
            `Next the wrapping began. Each mummy needed hundreds of yards of linen. The priests carefully wound the long strips of linen around the body, sometimes even wrapping each finger and toe separately before wrapping the entire hand or foot. In order to protect the dead from mishap, amulets were placed among the wrappings and prayers and magical words written on some of the linen strips. Often the priests placed a mask of the person's face between the layers of head bandages. At several stages the form was coated with warm resin and the wrapping resumed once again. At last, the priests wrapped the final cloth or shroud in place and secured it with linen strips. The mummy was complete. The priests preparing the mummy were not the only ones busy during this time. Although the tomb preparation usually had begun long before the person's actual death, now there was a deadline, and craftsmen, workers, and artists worked quickly. There was much to be placed in the tomb that a person would need in the Afterlife. Furniture and statuettes were readied; wall paintings of religious or daily scenes were prepared; and lists of food or prayers finished. Through a magical process, these models, pictures, and lists would become the real thing when needed in the Afterlife. Everything was now ready for the funeral.`,
            `As part of the funeral, priests performed special religious rites at the tomb's entrance. The most important part of the ceremony was called the "Opening of the Mouth." A priest touched various parts of the mummy with a special instrument to "open" those parts of the body to the senses enjoyed in life and needed in the Afterlife. By touching the instrument to the mouth, the dead person could now speak and eat. He was now ready for his journey to the Afterlife. The mummy was placed in his coffin, or coffins, in the burial chamber and the entrance sealed up.`,
            `Such elaborate burial practices might suggest that the Egyptians were preoccupied with thoughts of death. On the contrary, they began early to make plans for their death because of their great love of life. They could think of no life better than the present, and they wanted to be sure it would continue after death.`,
            `But why preserve the body? The Egyptians believed that the mummified body was the home for this soul or spirit. If the body was destroyed, the spirit might be lost.`,
            `The idea of "spirit" was complex involving really three spirits: the ka, ba, and akh. The ka, a "double" of the person, would remain in the tomb and needed the offerings and objects there. The ba, or "soul", was free to fly out of the tomb and return to it. And it was the akh, perhaps translated as "spirit", which had to travel through the Underworld to the Final Judgment and entrance to the Afterlife. To the Egyptian, all three were essential.`
        ],
        images: [mummy1, mummy2]
    }
];

const HistoricalContent = () => {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, []);

    const handleOpen = (item) => {
        setSelectedItem(item);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedItem(null);
    };
    return (
        <Container className="historical-content-container">
            <Toaster />
            <h1 className="text-center mb-4 p-2 section-title">Historical Content</h1>
            <Grid container spacing={4}>
                {data.map((item, index) => (
                    <Grid item xs={12} md={6} lg={4} key={index}>
                        <Card className="historical-content-card" onClick={() => handleOpen(item)} data-aos="fade-up">
                            <CardMedia
                                component="img"
                                height="200"
                                image={item.images[0]}
                                alt={item.title}
                            />
                            <CardContent>
                                <Typography className="historical-content-title">{item.title}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box className="modal-box">
                    {selectedItem && (
                        <>
                            <Typography id="modal-title" variant="h4" component="h2" className="mt-2 text-center">
                                {selectedItem.title}
                            </Typography>
                            {selectedItem.description.map((section, index) => (
                                <Typography id="modal-description" key={index} className="mt-2" component="div" dangerouslySetInnerHTML={{ __html: section }}></Typography>
                            ))}
                            <Typography className="mt-2">
                                Reference: <a href={selectedItem.reference} target="_blank" rel="noopener noreferrer">{selectedItem.reference}</a>
                            </Typography>
                        </>
                    )}
                </Box>
            </Modal>
        </Container>
    );
};

export default HistoricalContent;