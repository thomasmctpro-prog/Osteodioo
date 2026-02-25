export interface Track {
  id: number;
  title: string;
  duration: string;
  episode: string;
  image: string;
  audioUrl?: string;
}

export const INITIAL_PODCASTS: Track[] = [
  {
    id: 1,
    title: "[DEMO] Mécanique vertébrale équine",
    duration: "45 min",
    episode: "Ép. 24",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4v39BbS60beRD6w9CNEm3fU2OJZAcbNkNKbKByspiofYkNZ4dky3gCgP0zD3GqBzuYyQk8N9raCwIyexZFF1f8dr_ToyfcD_5YsNW_G4xvK_S0ABYjVVMNgz2uzDi9tioFWgS0eY1-7bUA-1D1YLqEDpUjatJUf3fywYI9AS2MFgVOb--aaVB9Z0rmKRSqhrAgcs_P3WIxLGd0GxiQi-5IAyst4WmLekBtb1YUsRN44Ey2KmqXdICYTBC7b9DeiaIBFseTgP-XsdT",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: 2,
    title: "[DEMO] Mobilisation bovine",
    duration: "32 min",
    episode: "Ép. 22",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDU03J-dO4DkRdLvtdapbKDkzu8f45riQhIRXTO5o2vCS-gtGKZHgtAwPe4rgMhJp-PIuoLdupufpMwlKBP2Xm2Ao5MWtnxHBPZxjc5ntIerQl7OecbATmeE0Jxf1XxuwsEFvahukWqBdbZmKDuCIIzIcDRzSezjdWholbMQZQqLPMLpN5bZKih8AvF1D19ckVIoXCwt9S1oC_jwyHACScq5pLyvNEIN8JxAUoJaCODaGtbBqcSZ5_0q9E0CFTUMyV1ReiKcm6XdaLU",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    id: 3,
    title: "[DEMO] Analyse de la marche canine",
    duration: "58 min",
    episode: "Ép. 21",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDG3P9jHUcCeS8z_VIRud8aSIYq50vp5KpelZTsQiUywsILBpS8G1U2lzgZEogMc0KJnPGmo8MyJeDWGVIuo1_q20GWqZYpaUod5GdrHquyC9MfJRzYpXWgxdYAifmCanmXcZwy_hW5DHCCAV41vovZRc1-tvtQSULWH-WFsxyawubW0PkF52z621WtA1ZM_jTk3Vo6g62vMRfzNtuD6a9R8u7j2S7pZzkHlq-YuwE-l9jxVe5Fqz2iAzDlVZkR8pduWGp0ydPCmo76",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  }
];

export const VIDEOS = [
  {
    id: 1,
    title: "[DEMO] Technique de thrust cervical",
    views: "12k vues",
    duration: "12:45",
    image: "https://picsum.photos/seed/thrust/800/450"
  },
  {
    id: 2,
    title: "[DEMO] Examen clinique du cheval",
    views: "8.5k vues",
    duration: "24:10",
    image: "https://picsum.photos/seed/horse-exam/800/450"
  },
  {
    id: 3,
    title: "[DEMO] Bases de l'anatomie canine",
    views: "15k vues",
    duration: "18:30",
    image: "https://picsum.photos/seed/dog-anatomy/800/450"
  }
];

export const LEARNING_PATHS = [
  {
    id: 1,
    tag: "Masterclass",
    title: "Ostéopathie équine",
    stats: "12 Cours • 48 Leçons",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4vUKyZm0e-EYf1suZ4YX_FwkMjUbjGn5yNv7jS4CEIy1_7dxbLZvy1X2GEGOZrEYrlL5JzAH5_Ba7Heywqu6FFJ8Cr0L3W5ILtiP1pPAhfh34IdY6oeZpE37i4JoB36Ipbwip72pY-SbikZImtHIf9okh0oBZuhXhIpQwOWmx-7DSGRnXPBiPAaLqijZ93q6ew6B3Omzk_CDN9CQ9fkt2NzhJSAMXrU6YOe5MEaIhQsB_SMaXnZKCYOW-DBzEopAAAthWCTHjyfjW"
  },
  {
    id: 2,
    tag: "Pratique",
    title: "Techniques bovines",
    stats: "8 Cours • 32 Leçons",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuClG_GbHWuQmzaQrwPt2w4jaJb-zgCZ50tLJOxcbkFG6ANR1ImxCuvoCou7gyBuPwL2dm0O5b_JGWcATpU2b5j5APzH7Da3zOY4fWcpeX2caoncIw-HCJDOmYrUqQCJIRecOADSP-GbSRc4EGa5PBHnAP82gE5RppRJjKGn3jCiVvAwfXPApJQmmPd7vANNCSccy-zJ3iOL9aoRWmyfzqBer8WYn7Aa04oC2GwnonpKNKUbMpBz2MwIFBMQ0YVp05l0krE-2oy-vC30"
  },
  {
    id: 3,
    tag: "Clinique",
    title: "Pratique canine",
    stats: "15 Cours • 60 Leçons",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFsC9gGzTS1pZLQv4-ppiYzYiFapr_3_zmzv9JNWpmdc94hGT3qdtZCHzR01Z7hM0E2M_Uu-DIl4K1oHFH6d2cRcMMUMtwbqKwkfJc4eeO-NsFUEIol4UZKWIiLRGmA6nlxjyirZzAcYTgLupeH-8iFGWrLkOstEU4QxlMiqxxq_hbgkUDYYnsvu7q6y6oIvjwKfhW7TEf-PYquBHp9s9EHj-tcOC45aOKEnomdt1edrx3VXUQn5In3KIoRqvEET2HWlkC9M1uiVgt"
  }
];
