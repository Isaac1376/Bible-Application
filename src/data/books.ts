import type { Book } from '../types'

export const initialBooks: Book[] = [
    {
        id: 'genesis',
        bookName: { en: 'Genesis', ta: 'ஆதியாகமம்' },
        testament: 'Old Testament',
        author: { en: 'Moses', ta: 'மோசே' },
        dateWritten: 'c. 1440-1400 BC',
        locationWritten: 'Egypt / Wilderness of Sinai',
        chapters: 50,
        introduction: {
            en: 'Genesis introduces the beginning of creation, covenant, and the unfolding of God’s redemptive plan.',
            ta: 'ஆதியாகமம், சிருஷ்டி, உடன்படிக்கை மற்றும் இறைவனின் மீட்புத் திட்டத்தின் தொடக்கத்தை அறிமுகப்படுத்துகிறது.'
        },
        about: {
            en: 'The book begins with creation and traces the early history of humanity, the flood, and the patriarchs.',
            ta: 'இந்தப் புத்தகம் சிருஷ்டியுடன் தொடங்கி மனிதவர்க்கத்தின் ஆரம்ப வரலாறு, ஜலப்பிரளயம் மற்றும் முன்னோர்களின் வாழ்க்கையை விவரிக்கிறது.'
        },
        historicalBackground: {
            en: 'Genesis is foundational for understanding Israel’s origins, covenant promises, and the creation narrative.',
            ta: 'இஸ்ரவேலின் தோற்றம், உடன்படிக்கை வாக்குறுதிகள் மற்றும் சிருஷ்டி கதையைப் புரிந்துகொள்ள ஆதியாகமம் அடித்தளமாக அமைந்துள்ளது.'
        },
        keyThemes: ['Creation', 'Covenant', 'Faith', 'Provision'],
        importantVerses: ['Genesis 1:1', 'Genesis 12:1-3', 'Genesis 22:8'],
        relatedBooks: ['Exodus', 'Leviticus', 'Romans'],
        coverImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
        chaptersData: [
            {
                chapterNumber: 1,
                title: { en: 'Creation', ta: 'சிருஷ்டி' },
                description: { en: 'The universe is brought into being by God’s spoken word.', ta: 'இறைவனின் வார்த்தையால் பிரபஞ்சம் உருவாக்கப்படுகிறது.' },
                explanation: { en: 'This chapter establishes the divine order and the goodness of creation.', ta: 'இந்த அதிகாரம் இறைவனின் ஒழுங்கு மற்றும் சிருஷ்டியின் நன்மையை நிறுவுகிறது.' },
                images: ['https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=700&q=80']
            },
            {
                chapterNumber: 2,
                title: { en: 'Garden of Eden', ta: 'ஈதனின் தோட்டம்' },
                description: { en: 'God places Adam and Eve in the garden and gives them a sacred calling.', ta: 'அதாமும் ஏவாளும் தோட்டத்தில் வைக்கப்பட்டு பரிசுத்த அழைப்பைப் பெறுகிறார்கள்.' },
                explanation: { en: 'The chapter highlights the beauty of communion and the consequence of disobedience.', ta: 'இந்த அதிகாரம் உடன்படிக்கையின் அழகு மற்றும் கீழ்ப்படியாமையின் விளைவை எடுத்துரைக்கிறது.' },
                images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=80']
            }
        ]
    },
    {
        id: 'exodus',
        bookName: { en: 'Exodus', ta: 'யாத்திராகமம்' },
        testament: 'Old Testament',
        author: { en: 'Moses', ta: 'மோசே' },
        dateWritten: 'c. 1440-1400 BC',
        locationWritten: 'Sinai Peninsula',
        chapters: 40,
        introduction: {
            en: 'Exodus tells the story of Israel’s deliverance from Egypt and the giving of the law.',
            ta: 'யாத்திராகமம், எகிப்திலிருந்து இஸ்ரவேலின் மீட்பையும், சட்டத்தின் கொடுப்பையும் விவரிக்கிறது.'
        },
        about: {
            en: 'The book recounts the plagues, the Passover, the Red Sea crossing, and the covenant at Sinai.',
            ta: 'இந்தப் புத்தகம் வாதைகள், பாஸ்கா, செங்கடல் கடப்பது மற்றும் சீனாய் மலையில் உடன்படிக்கை ஆகியவற்றை கூறுகிறது.'
        },
        historicalBackground: {
            en: 'Exodus is central to Israel’s identity as a people rescued by God and bound to his law.',
            ta: 'இறைவனால் மீட்கப்பட்ட மக்களாகவும், அவருடைய சட்டத்திற்கு கட்டுப்பட்டவர்களாகவும் இஸ்ரவேலின் அடையாளத்திற்கு யாத்திராகமம் மையமாக உள்ளது.'
        },
        keyThemes: ['Deliverance', 'Law', 'Covenant', 'Worship'],
        importantVerses: ['Exodus 14:14', 'Exodus 20:2-3', 'Exodus 34:6-7'],
        relatedBooks: ['Genesis', 'Leviticus', 'Deuteronomy'],
        coverImage: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=900&q=80',
        chaptersData: [
            {
                chapterNumber: 1,
                title: { en: 'The Call of Moses', ta: 'மோசேயின் அழைப்பு' },
                description: { en: 'God calls Moses to lead Israel out of slavery.', ta: 'இஸ்ரவேலை அடிமைத்தனத்திலிருந்து வெளியே கொண்டு வர மோசேக்கு இறைவன் அழைப்பு விடுக்கிறார்.' },
                explanation: { en: 'Moses becomes the instrument of liberation and covenant obedience.', ta: 'மோசே விடுதலைக்கும் உடன்படிக்கை கீழ்ப்படிதலுக்கும் கருவியாகிறார்.' },
                images: ['https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=700&q=80']
            }
        ]
    },
    {
        id: 'leviticus',
        bookName: { en: 'Leviticus', ta: 'லேவியராகமம்' },
        testament: 'Old Testament',
        author: { en: 'Moses', ta: 'மோசே' },
        dateWritten: 'c. 1440-1400 BC',
        locationWritten: 'Desert of Sinai',
        chapters: 27,
        introduction: {
            en: 'Leviticus focuses on holiness, worship, and the priestly life of Israel.',
            ta: 'லேவியராகமம் பரிசுத்தம், வழிபாடு மற்றும் இஸ்ரவேலின் ஆசாரிய வாழ்க்கையை மையப்படுத்துகிறது.'
        },
        about: {
            en: 'The book outlines sacrifices, purity laws, and the role of priests in maintaining covenant fellowship.',
            ta: 'இந்தப் புத்தகம் பலிகளையும், தூய்மைக்கான சட்டங்களையும், உடன்படிக்கை நட்பைப் பேணுவதில் ஆசாரியர்களின் பங்கை விளக்குகிறது.'
        },
        historicalBackground: {
            en: 'Leviticus teaches that holiness is the proper response to God’s presence and covenant grace.',
            ta: 'இறைவனின் இருப்புக்கும் உடன்படிக்கை கிருபைக்கும் பொருத்தமான மறுமொழியாக பரிசுத்தம் இருக்க வேண்டும் என்று லேவியராகமம் போதிக்கிறது.'
        },
        keyThemes: ['Holiness', 'Sacrifice', 'Priesthood', 'Obedience'],
        importantVerses: ['Leviticus 19:2', 'Leviticus 16:30', 'Leviticus 26:12'],
        relatedBooks: ['Exodus', 'Numbers', 'Hebrews'],
        coverImage: 'https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=900&q=80',
        chaptersData: [
            {
                chapterNumber: 1,
                title: { en: 'Sacrifices', ta: 'பலிகள்' },
                description: { en: 'God gives instructions for offerings and worship.', ta: 'வழிபாடு மற்றும் பலிகளுக்கான வழிமுறைகளை இறைவன் அளிக்கிறார்.' },
                explanation: { en: 'The sacrificial system teaches reverence and atonement.', ta: 'பலிச் சட்டம் மரியாதையும் பரிகாரமும் கற்றுக்கொடுக்கிறது.' },
                images: ['https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=700&q=80']
            }
        ]
    },
    {
        id: 'numbers',
        bookName: { en: 'Numbers', ta: 'எண்ணாகமம்' },
        testament: 'Old Testament',
        author: { en: 'Moses', ta: 'மோசே' },
        dateWritten: 'c. 1400-1370 BC',
        locationWritten: 'Wilderness',
        chapters: 36,
        introduction: {
            en: 'Numbers records Israel’s wilderness journey and the testing of covenant faithfulness.',
            ta: 'எண்ணாகமம் இஸ்ரவேலின் பாலைவனப் பயணத்தையும் உடன்படிக்கை விசுவாசத்தின் சோதனைகளையும் பதிவு செய்கிறது.'
        },
        about: {
            en: 'The book includes census lists, camp arrangements, complaints, and leadership transitions.',
            ta: 'இந்தப் புத்தகம் மக்கள் தொகை விவரங்கள், முகாமிடுதல், குறைகூறல்கள் மற்றும் தலைமை மாற்றங்களை உள்ளடக்கியது.'
        },
        historicalBackground: {
            en: 'Numbers demonstrates the tension between God’s promises and the people’s rebellion.',
            ta: 'எண்ணாகமம், இறைவனின் வாக்குறுதிகளுக்கும் மக்களின் கலகத்திற்கும் இடையிலான பதற்றத்தை காட்டுகிறது.'
        },
        keyThemes: ['Wilderness', 'Testing', 'Leadership', 'Faithfulness'],
        importantVerses: ['Numbers 6:24-26', 'Numbers 14:11', 'Numbers 23:19'],
        relatedBooks: ['Leviticus', 'Deuteronomy', 'Joshua'],
        coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80',
        chaptersData: [
            {
                chapterNumber: 1,
                title: { en: 'The Census', ta: 'மக்கள் தொகை' },
                description: { en: 'The people are counted before entering the promised land.', ta: 'வாக்கப்பட்ட நிலத்திற்குள் நுழைவதற்கு முன் மக்கள் எண்ணப்படுகிறார்கள்.' },
                explanation: { en: 'The census demonstrates order, preparation, and divine promise.', ta: 'இந்த மக்கள் தொகை ஒழுங்கு, ஆயத்தம் மற்றும் இறைவனின் வாக்குறுதியைக் காட்டுகிறது.' },
                images: ['https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=700&q=80']
            }
        ]
    },
    {
        id: 'deuteronomy',
        bookName: { en: 'Deuteronomy', ta: 'உபாகமம்' },
        testament: 'Old Testament',
        author: { en: 'Moses', ta: 'மோசே' },
        dateWritten: 'c. 1400-1380 BC',
        locationWritten: 'Plains of Moab',
        chapters: 34,
        introduction: {
            en: 'Deuteronomy records Moses’ final speeches and Israel’s renewed covenant commitment.',
            ta: 'உபாகமம், மோசேயின் கடைசி சொற்பொழிவுகளையும் இஸ்ரவேலின் புதுப்பிக்கப்பட்ட உடன்படிக்கை உறுதிப்பாட்டையும் பதிவு செய்கிறது.'
        },
        about: {
            en: 'The book restates the law and calls the people to faithful obedience before entering the land.',
            ta: 'இந்தப் புத்தகம் சட்டத்தை மீண்டும் சொல்கிறது மற்றும் நிலத்தைச் செல்வதற்கு முன் மக்கள் விசுவாசமான கீழ்ப்படிதலுக்கு அழைக்கிறது.'
        },
        historicalBackground: {
            en: 'Deuteronomy serves as a covenant renewal document before conquest and settlement.',
            ta: 'வெற்றியும் குடியேற்றமும் முன் உடன்படிக்கை புதுப்பிப்புக் ஆவணமாக உபாகமம் செயல்படுகிறது.'
        },
        keyThemes: ['Covenant Renewal', 'Obedience', 'Remembering God', 'Blessing and Warning'],
        importantVerses: ['Deuteronomy 6:4-5', 'Deuteronomy 30:19', 'Deuteronomy 32:39'],
        relatedBooks: ['Numbers', 'Joshua', 'Romans'],
        coverImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80',
        chaptersData: [
            {
                chapterNumber: 1,
                title: { en: 'Remember the Lord', ta: 'கர்த்தரை நினைவு கூருங்கள்' },
                description: { en: 'Moses urges Israel to remember God’s mighty acts.', ta: 'இறைவனின் வல்லமையான செயல்களை நினைவுகூருமாறு மோசே இஸ்ரவேலை வற்புறுத்துகிறார்.' },
                explanation: { en: 'Remembrance is the foundation of holy obedience and gratitude.', ta: 'நினைவு பரிசுத்த கீழ்ப்படிதலுக்கும் நன்றியுணர்வுக்கும் அடிப்படையாகும்.' },
                images: ['https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=700&q=80']
            }
        ]
    },
    {
        id: 'matthew',
        bookName: { en: 'Matthew', ta: 'மத்தேயு' },
        testament: 'New Testament',
        author: { en: 'Matthew the Apostle', ta: 'அப்போஸ்தலன் மத்தேயு' },
        dateWritten: 'c. 70-90 AD',
        locationWritten: 'Antioch or Syria',
        chapters: 28,
        introduction: {
            en: 'Matthew presents Jesus as the long-awaited Messiah and the King of Israel.',
            ta: 'மத்தேயு, இயேசுவை நீண்டகாலமாக எதிர்பார்க்கப்பட்ட மெசியாவாகவும், இஸ்ரவேலின் அரசராகவும் முன்வைக்கிறார்.'
        },
        about: {
            en: 'The book highlights Jesus’ teaching, miracles, and fulfillment of Hebrew prophecy.',
            ta: 'இந்தப் புத்தகம் இயேசுவின் போதனைகள், அதிசயங்கள் மற்றும் எபிரெய வேதவாக்கியங்களின் நிறைவேற்றத்தை எடுத்துக்காட்டுகிறது.'
        },
        historicalBackground: {
            en: 'Matthew is written to a Jewish audience that needs to see Jesus as the promised Savior.',
            ta: 'வாக்கப்பட்ட இரட்சகராக இயேசுவை காண வேண்டிய யூத வாசகர்களுக்காக மத்தேயு எழுதப்பட்டது.'
        },
        keyThemes: ['Kingdom', 'Messiah', 'Teaching', 'Fulfillment'],
        importantVerses: ['Matthew 5:3', 'Matthew 6:33', 'Matthew 28:19-20'],
        relatedBooks: ['Mark', 'Luke', 'Hebrews'],
        coverImage: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=900&q=80',
        chaptersData: [
            {
                chapterNumber: 1,
                title: { en: 'The Genealogy', ta: 'வம்சவரலாறு' },
                description: { en: 'Matthew opens with the genealogy of Jesus and the birth narrative.', ta: 'மத்தேயு இயேசுவின் வம்சவரலாறும் பிறப்புக் கதையும் கொண்டு தொடங்குகிறது.' },
                explanation: { en: 'The genealogy ties Jesus to the promises of Abraham and David.', ta: 'இந்த வம்சவரலாறு இயேசுவை ஆபிரகாமும் தாவீதும் அளித்த வாக்குறுதிகளுடன் இணைக்கிறது.' },
                images: ['https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=700&q=80']
            }
        ]
    },
    {
        id: 'mark',
        bookName: { en: 'Mark', ta: 'மாற்கு' },
        testament: 'New Testament',
        author: { en: 'John Mark', ta: 'யோவான் மாற்கு' },
        dateWritten: 'c. 65-75 AD',
        locationWritten: 'Rome or Syria',
        chapters: 16,
        introduction: {
            en: 'Mark presents Jesus with urgency, showing his authority, compassion, and sacrifice.',
            ta: 'மாற்கு, இயேசுவின் அதிகாரம், இரக்கம் மற்றும் தியாகத்தைத் துடிப்புடன் சித்தரிக்கிறார்.'
        },
        about: {
            en: 'This short Gospel emphasizes action, miracles, and the servant-hearted ministry of Christ.',
            ta: 'இந்தச் சுருக்கமான சுவிசேஷம் செயல்களையும், அதிசயங்களையும், கிறிஸ்துவின் ஊழியத்தின் அடக்கமான இயல்பையும் வலியுறுத்துகிறது.'
        },
        historicalBackground: {
            en: 'Mark likely wrote for Roman readers who needed a vivid picture of Jesus’ mission.',
            ta: 'ரோம வாசகர்களுக்காக இயேசுவின் பணியைத் தெளிவாகப் பார்க்க வேண்டியதற்காக மாற்கு எழுதியிருக்கலாம்.'
        },
        keyThemes: ['Servanthood', 'Miracles', 'Discipleship', 'The Cross'],
        importantVerses: ['Mark 10:45', 'Mark 8:34', 'Mark 16:15'],
        relatedBooks: ['Matthew', 'Luke', 'Philippians'],
        coverImage: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=900&q=80',
        chaptersData: [
            {
                chapterNumber: 1,
                title: { en: 'The Beginning of the Gospel', ta: 'சுவிசேஷத்தின் தொடக்கம்' },
                description: { en: 'Jesus begins his public ministry with baptism and testing.', ta: 'இயேசு ஞானஸ்நானத்திலும் சோதனையிலும் தமது பொதுப் பணியைத் தொடங்குகிறார்.' },
                explanation: { en: 'The chapter announces the arrival of the kingdom in a powerful way.', ta: 'இந்த அதிகாரம் ராஜ்யத்தின் வருகையை வல்லமையுடன் அறிவிக்கிறது.' },
                images: ['https://images.unsplash.com/photo-1518639192441-8f0c7e4f9f0f?auto=format&fit=crop&w=700&q=80']
            }
        ]
    },
    {
        id: 'luke',
        bookName: { en: 'Luke', ta: 'லூக்கா' },
        testament: 'New Testament',
        author: { en: 'Luke the Physician', ta: 'லூக்கா மருத்துவர்' },
        dateWritten: 'c. 80-90 AD',
        locationWritten: 'Caesarea or Antioch',
        chapters: 24,
        introduction: {
            en: 'Luke presents Jesus as Savior for all people, especially the marginalized and the poor.',
            ta: 'லூக்கா, இயேசுவை எல்லா மக்களுக்கும் மீட்பராகவும், குறிப்பாக ஒதுக்கப்பட்டவர்களுக்கும் ஏழைகளுக்கும் முன்வைக்கிறார்.'
        },
        about: {
            en: 'The Gospel of Luke includes the birth narrative, parables, and the journey to Jerusalem.',
            ta: 'லூக்கா சுவிசேஷம் பிறப்புக் கதையும், உவமைகளும், எருசலேமுக்கான பயணமும் அடங்கியுள்ளது.'
        },
        historicalBackground: {
            en: 'Luke writes with a careful, historical perspective and a strong concern for those on the margins.',
            ta: 'லூக்கா, வரலாற்று ரீதியாகக் கவனமாகவும், விளிம்புநிலையிலுள்ளோர்மீது அக்கறையுடனும் எழுதினார்.'
        },
        keyThemes: ['Compassion', 'Prayer', 'Mercy', 'Salvation for All'],
        importantVerses: ['Luke 4:18', 'Luke 15:4-7', 'Luke 19:10'],
        relatedBooks: ['Matthew', 'John', 'Acts'],
        coverImage: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=900&q=80',
        chaptersData: [
            {
                chapterNumber: 1,
                title: { en: 'The Birth of John', ta: 'யோவான் பிறப்பு' },
                description: { en: 'Luke opens with the miraculous birth of John the Baptist.', ta: 'லூக்கா யோவான் ஸ்நானகனைப் பற்றிய அதிசயப் பிறப்புடன் தொடங்குகிறது.' },
                explanation: { en: 'The chapter prepares the way for the coming Savior.', ta: 'இந்த அதிகாரம் வரவிருக்கும் மீட்பருக்கான பாதையைத் தயாரிக்கிறது.' },
                images: ['https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=700&q=80']
            }
        ]
    },
    {
        id: 'john',
        bookName: { en: 'John', ta: 'யோவான்' },
        testament: 'New Testament',
        author: { en: 'John the Apostle', ta: 'அப்போஸ்தலன் யோவான்' },
        dateWritten: 'c. 85-95 AD',
        locationWritten: 'Ephesus',
        chapters: 21,
        introduction: {
            en: 'John presents Jesus as the eternal Word and the Son of God, revealing divine glory.',
            ta: 'யோவான் இயேசுவை நித்திய வார்த்தையாகவும் இறைவனின் குமாரராகவும் முன்வைத்து, இறைவனின் மகிமையை வெளிப்படுத்துகிறார்.'
        },
        about: {
            en: 'The Gospel of John emphasizes signs, belief, and the intimate relationship between God and humanity.',
            ta: 'யோவான் நற்செய்தி அடையாளங்களையும் விசுவாசத்தையும் இறைவனுக்கும் மனிதவர்க்கத்திற்கும் இடையிலான நெருக்கமான உறவையும் வலியுறுத்துகிறது.'
        },
        historicalBackground: {
            en: 'John writes to believers needing deep theological insight into the identity of Christ.',
            ta: 'கிறிஸ்துவின் அடையாளம் பற்றிய ஆழமான இறையியல் புரிதல் தேவைப்படும் விசுவாசிகளுக்காக யோவான் எழுதினார்.'
        },
        keyThemes: ['Light', 'Life', 'Love', 'Belief'],
        importantVerses: ['John 1:1', 'John 3:16', 'John 14:6'],
        relatedBooks: ['Luke', 'Acts', 'Revelation'],
        coverImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
        chaptersData: [
            {
                chapterNumber: 1,
                title: { en: 'The Word Became Flesh', ta: 'வார்த்தை மாம்சமாயிற்று' },
                description: { en: 'John opens by identifying Jesus as the eternal Word.', ta: 'யோவான் இயேசு நித்திய வார்த்தை என்றும் தொடங்குகிறார்.' },
                explanation: { en: 'The prologue speaks of divine glory and the life-giving nature of Christ.', ta: 'இந்த முன்னுரை இறைவனின் மகிமையையும் கிறிஸ்துவின் ஆயுள் அளிக்கும் இயல்பையும் பேசுகிறது.' },
                images: ['https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=700&q=80']
            }
        ]
    },
    {
        id: 'acts',
        bookName: { en: 'Acts', ta: 'அப்போஸ்தலர் பணிகள்' },
        testament: 'New Testament',
        author: { en: 'Luke', ta: 'லூக்கா' },
        dateWritten: 'c. 80-90 AD',
        locationWritten: 'Caesarea or Rome',
        chapters: 28,
        introduction: {
            en: 'Acts narrates the spread of the early church through the power of the Holy Spirit.',
            ta: 'அப்போஸ்தலர் பணிகள் பரிசுத்த ஆவியின் வல்லமையால் ஆரம்பகால திருச்சபையின் பரவலை விவரிக்கிறது.'
        },
        about: {
            en: 'The book recounts Pentecost, missionary journeys, and the growth of the church.',
            ta: 'இந்தப் புத்தகம் பெந்தெகொஸ்தே, மிஷனரி பயணங்கள் மற்றும் திருச்சபையின் வளர்ச்சியை விவரிக்கிறது.'
        },
        historicalBackground: {
            en: 'Acts shows how the gospel moved from Jerusalem to the ends of the earth.',
            ta: 'எருசலேமிலிருந்து பூமியின் எல்லைகள்வரை சுவிசேஷம் எவ்வாறு நகர்ந்தது என்பதைக் காட்டுகிறது.'
        },
        keyThemes: ['Mission', 'Holy Spirit', 'Church', 'Persecution'],
        importantVerses: ['Acts 1:8', 'Acts 2:1-4', 'Acts 16:31'],
        relatedBooks: ['Luke', 'Romans', 'Revelation'],
        coverImage: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80',
        chaptersData: [
            {
                chapterNumber: 1,
                title: { en: 'The Ascension', ta: 'உயிர்த்தெழுதல் பின்னர்' },
                description: { en: 'Jesus commissions his disciples before ascending to heaven.', ta: 'இயேசு பரலோகத்திற்கு எழுந்துசெல்வதற்கு முன் தமது சீடர்களுக்கு உத்தரவிடுகிறார்.' },
                explanation: { en: 'The chapter launches the church’s mission with the Spirit’s promise.', ta: 'இந்த அதிகாரம் ஆவியின் வாக்குறுதியுடன் திருச்சபையின் பணியைத் தொடங்குகிறது.' },
                images: ['https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=700&q=80']
            }
        ]
    }
]
