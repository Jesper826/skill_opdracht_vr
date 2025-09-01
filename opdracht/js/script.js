const projects = [
  {
    id: 1,
    title: "The Hive",
    city_location: "Madrid, Spain",
    image_main: "../web-developer-media-assets-2024-2025/thehive-outside.jpg",
    image_second: "../web-developer-media-assets-2024-2025/thehive-inside.jpg"
  },
  {
    id: 2,
    title: "B'Fly",
    city_location: "Tijuana, Mexico",
    image_main: "../web-developer-media-assets-2024-2025/bfly-outside.jpg",
    image_second: "../web-developer-media-assets-2024-2025/bfly-inside.jpg"
  },
  {
    id: 3,
    title: "Bonsai",
    city_location: "Kyoto, Japan",
    image_main: "../web-developer-media-assets-2024-2025/bonsai-outside.jpg",
    image_second: "../web-developer-media-assets-2024-2025/bonsai-inside.jpg"
  },
  {
    id: 4,
    title: "L'Camou",
    city_location: "Vancouver, Canada",
    image_main: "../web-developer-media-assets-2024-2025/lcamou-outside.jpg",
    image_second: "../web-developer-media-assets-2024-2025/lcamou-inside.jpg"
  }
];

let order = [0, 1, 2, 3]; 
function renderProjects() {
  const mainPhoto = document.getElementById('main-photo');
  
  mainPhoto.src = projects[order[0]].image_main;
  mainPhoto.alt = projects[order[0]].title + " hoofdafbeelding";

  const list = document.getElementById('projects-list');
  list.innerHTML = '';
  order.forEach((idx, i) => {
    const project = projects[idx];
    const card = document.createElement('div');
    card.className = 'project-card';
    card.draggable = true;
    card.dataset.idx = i;

  
    card.addEventListener('dragstart', (e) => {
      card.classList.add('dragging');
      e.dataTransfer.setData('text/plain', i);
    });
    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
    });
    card.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
    card.addEventListener('drop', (e) => {
      e.preventDefault();
      const from = Number(e.dataTransfer.getData('text/plain'));
      const to = i;
      if (from !== to) {
        const newOrder = [...order];
        const [moved] = newOrder.splice(from, 1);
        newOrder.splice(to, 0, moved);
        order = newOrder;
        renderProjects();
      }
    });

    const imgContainer = document.createElement('div');
    imgContainer.className = 'image-container';
    const img = document.createElement('img');
    img.src = project.image_main;
    img.alt = project.title;
    img.className = 'fade-out';
    imgContainer.appendChild(img);

    imgContainer.addEventListener('mouseenter', () => {
      img.src = project.image_second;
      img.className = 'fade-in';
    });
    imgContainer.addEventListener('mouseleave', () => {
      img.src = project.image_main;
      img.className = 'fade-out';
    });

 
    const info = document.createElement('div');
    info.className = 'project-info';
    info.innerHTML = `<h3>${project.title}</h3><p>${project.city_location}</p>`;

    card.appendChild(imgContainer);
    card.appendChild(info);
    list.appendChild(card);
  });
}

renderProjects();