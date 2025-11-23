import { Era } from './types';

export const ERAS: Era[] = [
  {
    id: 'roaring-20s',
    title: '咆哮的二十年代',
    description: '爵士乐、摩登女郎和装饰艺术的魅力。',
    promptModifier: 'in the style of a 1920s vintage photograph. The person should be wearing 1920s flapper fashion or a sharp suit, art deco background, black and white or sepia tone, grainy film texture.',
    icon: '🎷',
    color: 'from-yellow-400 to-yellow-600'
  },
  {
    id: 'ancient-egypt',
    title: '古埃及',
    description: '法老、金字塔和金色的沙滩。',
    promptModifier: 'as an Ancient Egyptian nobility. Wearing gold jewelry, linen robes, dramatic eyeliner. Background of temples or pyramids in the desert. Warm golden lighting, hierarchical perspective.',
    icon: '🏺',
    color: 'from-amber-300 to-amber-500'
  },
  {
    id: 'medieval-knight',
    title: '中世纪骑士',
    description: '城堡、盔甲和史诗般的冒险。',
    promptModifier: 'wearing detailed medieval plate armor or noble medieval clothing. Background of a stone castle or medieval village. Dramatic lighting, oil painting style.',
    icon: '⚔️',
    color: 'from-slate-400 to-slate-600'
  },
  {
    id: 'cyberpunk-2077',
    title: '赛博朋克 2077',
    description: '霓虹灯、高科技、低生活。',
    promptModifier: 'in a futuristic cyberpunk city with neon lights, cybernetic enhancements visible, futuristic streetwear, rain-slicked streets at night, vibrant blue and pink lighting.',
    icon: '🤖',
    color: 'from-cyan-400 to-fuchsia-500'
  },
  {
    id: 'victorian-steampunk',
    title: '蒸汽朋克',
    description: '齿轮、护目镜和蒸汽动力。',
    promptModifier: 'in a steampunk aesthetic. Wearing brass goggles, leather corset or vest, gears and clockwork accessories. Industrial revolution background with steam engines.',
    icon: '⚙️',
    color: 'from-orange-700 to-amber-800'
  },
  {
    id: 'wild-west',
    title: '狂野西部',
    description: '牛仔、酒馆和边疆。',
    promptModifier: 'as a rugged cowboy or cowgirl in the American Wild West (1880s). Wearing a stetson hat, leather duster, bandana. Wooden saloon or desert canyon background.',
    icon: '🤠',
    color: 'from-orange-400 to-red-600'
  },
  {
    id: '80s-synthwave',
    title: '80年代合成波',
    description: '复古夕阳、网格线和夸张的发型。',
    promptModifier: 'in a 1980s synthwave style. Big hair, neon geometric shapes, retro-futuristic grid background, vibrant purples and teals, VHS glitch effect.',
    icon: '😎',
    color: 'from-pink-500 to-purple-600'
  },
  {
    id: 'viking-warrior',
    title: '维京战士',
    description: '皮草、战斧和瓦尔哈拉。',
    promptModifier: 'as a fierce Viking warrior. Wearing fur and leather armor, war paint. Snowy fjord background. Cold, desaturated blue tones, cinematic lighting.',
    icon: '🪓',
    color: 'from-sky-700 to-slate-800'
  },
  {
    id: 'samurai',
    title: '日本武士',
    description: '武士刀、樱花和武士道精神。',
    promptModifier: 'as a traditional Japanese Samurai. Wearing detailed samurai armor (yoroi), katana at waist. Background of falling cherry blossoms and a traditional Japanese temple or dojo. Cinematic lighting.',
    icon: '🏯',
    color: 'from-red-600 to-stone-800'
  },
  {
    id: 'space-explorer',
    title: '太空探索者',
    description: '宇航服、星云和未知星球。',
    promptModifier: 'wearing a high-tech sci-fi space suit or astronaut gear. Floating in a zero-gravity environment or standing on an alien planet surface. Background of colorful nebula and stars. Futuristic lighting.',
    icon: '🚀',
    color: 'from-indigo-600 to-blue-800'
  },
  {
    id: 'renaissance',
    title: '文艺复兴贵族',
    description: '天鹅绒、蕾丝和油画质感。',
    promptModifier: 'as a nobility from the Renaissance period. Wearing velvet robes, lace collars, pearl jewelry. Background of a palatial room or Italian landscape. Style of a classic oil painting like Da Vinci or Raphael.',
    icon: '🎨',
    color: 'from-emerald-600 to-teal-800'
  },
  {
    id: 'pirate',
    title: '海盗船长',
    description: '藏宝图、朗姆酒和七海传说。',
    promptModifier: 'as a swashbuckling pirate captain. Wearing a tricorn hat, eye patch, long coat. Background of a pirate ship deck on a stormy ocean or tropical island. Dramatic adventure lighting.',
    icon: '🏴‍☠️',
    color: 'from-red-800 to-amber-900'
  },
  {
    id: 'noir',
    title: '黑色电影',
    description: '阴影、风衣和神秘案件。',
    promptModifier: 'in a 1940s Film Noir style. Wearing a trench coat and fedora. Rainy city street at night, high contrast black and white photography, dramatic shadows (chiaroscuro), mysterious atmosphere.',
    icon: '🕵️',
    color: 'from-gray-600 to-gray-900'
  },
  {
    id: 'fantasy-elf',
    title: '奇幻精灵',
    description: '尖耳朵、魔法森林和空灵之美。',
    promptModifier: 'as a high fantasy elf. Pointed ears, long flowing hair, elegant silver or nature-inspired robes. Background of a magical bioluminescent forest (Rivendell style). Ethereal, glowing lighting.',
    icon: '🧝',
    color: 'from-green-400 to-emerald-600'
  },
  {
    id: 'post-apocalyptic',
    title: '末日废土',
    description: '生存装备、废墟和荒凉世界。',
    promptModifier: 'in a post-apocalyptic wasteland style (Mad Max or Fallout). Wearing scavenged tactical gear, dust goggles, distressed clothing. Background of ruined city or desert wasteland. Gritty, desaturated look.',
    icon: '☢️',
    color: 'from-stone-500 to-orange-900'
  },
  {
    id: '1950s-rockabilly',
    title: '50年代摇滚',
    description: '波点裙、皮夹克和点唱机。',
    promptModifier: 'in a 1950s rockabilly style. Wearing a leather jacket and pompadour hair, or a polka dot dress. Background of a retro American diner with neon signs and checkerboard floor. Vibrant Kodachrome colors.',
    icon: '🎸',
    color: 'from-rose-400 to-cyan-400'
  }
];

export const MODEL_NAMES = {
  EDITING: 'gemini-2.5-flash-image',
  ANALYSIS: 'gemini-3-pro-preview'
};