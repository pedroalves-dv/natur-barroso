import type { Guide } from '@/types/guide';

export const guides: Guide[] = [
  {
    slug: 'rui-ferreira',
    name: 'Rui Ferreira',
    role: 'Guia de Cultura e Património',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    bio: 'Natural de Montalegre, Rui cresceu entre as aldeias do planalto barrosano. Licenciado em História e com formação em animação turística, combina rigor académico com a intimidade de quem conhece cada pedra deste território. É ele quem conta as histórias que não estão nos livros — das comunidades que resistiram séculos de isolamento, dos contrabandistas da fronteira e das tradições que ainda sobrevivem.',
    specialties: ['História local', 'Etnografia barrosana', 'Arquitetura vernácula'],
    languages: ['Português', 'Inglês', 'Espanhol'],
  },
  {
    slug: 'ana-teixeira',
    name: 'Ana Teixeira',
    role: 'Guia de Montanha Certificada (IPDJ)',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    bio: 'Ana é guia de montanha certificada com mais de 10 anos de experiência no Peneda-Gerês. Especialista em flora e fauna do parque, conduziu mais de 400 grupos por estes trilhos. Fala com a paixão de alguém que conhece cada curva do rio. É também fotógrafa de natureza — na mochila raramente falta uma câmara com teleobjetiva.',
    specialties: ['Flora e fauna do Peneda-Gerês', 'Trilhos de montanha', 'Fotografia de natureza'],
    languages: ['Português', 'Inglês', 'Francês'],
  },
  {
    slug: 'pedro-matos',
    name: 'Pedro Matos',
    role: 'Guia de Expedição e Todo-o-Terreno',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    bio: 'Pedro nasceu no Barroso e conhece cada pista e atalho como a palma da mão. Piloto de todo-o-terreno com 15 anos de experiência, é também apaixonado pela fauna local — especialmente pelo lobo-ibérico, cujos territórios conhece de cor. A sua rede de contactos em aldeias remotas abre portas que nenhum mapa turístico consegue abrir.',
    specialties: ['Todo-o-terreno', 'Fauna do Barroso', 'Expedições de fronteira'],
    languages: ['Português', 'Inglês'],
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
