// Edit everything about the invitation here. Anything marked TODO needs your real details.
export const weddingConfig = {
  groom: { name: "Jislin Leoj", parents: "Son of Mr.Prakash & Mrs.Mary Sahaya Jacqulin" }, // TODO
  bride: { name: "Lourdhu Britta", parents: "Daughter of Mr.Peter Rajan & Mrs.Pani Mary" }, // TODO
  tagline: "Together with our families, we invite you to celebrate our wedding",
  wedding: {
    title: "Wedding Ceremony",
    date: "2026-10-19",
    startTime: "09:30",
    endTime: "10:30",
    timezoneOffset: "+05:30"
  },
  reception: {
    title: "Wedding Reception",
    date: "2026-10-19",
    startTime: "18:00",
    endTime: "21:00",
    timezoneOffset: "+05:30",
    // Reception venue (separate from the church)
    venueName: "YR Mahal",
    address: "YR Mahal,Water Tank Road,christu Nagar, Kanyakumari district",
    mapsLink: "https://www.google.com/maps/place/Y.R.+Mahal/@8.1844957,77.4192424,17z/data=!3m1!4b1!4m6!3m5!1s0x3b04f0d9832b889b:0xfef33cea987d6e90!8m2!3d8.1844957!4d77.4192424!16s%2Fg%2F11b7gmdqm9?entry=ttu&g_ep=EgoyMDI2MDkyOS4wIKXMDSoASAFQAw%3D%3D"
  },
  engagement: {
    title: "Our Engagement",
    date: "2026-08-23",
    message: "We said yes! Thank you for all the love and blessings.",
    // Files live in src/assets/. Replace them with your own photos using the same names.
    photos: ["engagement-1.jpg", "engagement-2.jpg", "engagement-3.jpg", "engagement-4.jpg"]
  },
  venue: {
    name: "St.Antony's church",
    city: "St.Antony's church Azhagappapuram kanyakumari district", // shown on the hero
    address: "St.Antony's church Azhagappapuram kanyakumari district",
    mapsLink: "https://www.google.com/maps/place/St.+Antony's+Church/@8.1460888,77.5398785,17z/data=!3m1!4b1!4m6!3m5!1s0x3b04f2c290fb1651:0x6c2c80ba535a1406!8m2!3d8.1460888!4d77.5398785!16s%2Fg%2F1th7lb46?entry=ttu&g_ep=EgoyMDI2MDkyOS4wIKXMDSoASAFQAw%3D%3D",
    mapsEmbedUrl: "" // optional: Google Maps > Share > Embed a map > copy the src URL
  },
  contacts: [
    { label: "Groom's family", name: "Joel(celebrity)", phone: "+918825426027" },
    { label: "Groom's family", name: "Jebin(Dhrogi 2)", phone: "+917305114844" },
    { label: "Bride's family", name: "Akash", phone: "+918300202966" }
  ],
  rsvp: { whatsappNumber: "919344325545", deadline: "2026-10-18" }, // digits only, with country code
  music: { src: "/music/wedding.mp3", autoplayOnOpen: false }, // set autoplayOnOpen: true to start music when the envelope is tapped
  hashtag: "#JislinWedsBritta",
  siteUrl: "https://jislinbrittawedding.vercel.app/" // TODO: update after deploy
};