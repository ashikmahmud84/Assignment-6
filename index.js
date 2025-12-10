const categoryContainer = document.getElementById("category-container");
const cardContainer = document.getElementById("card-container");
const bookmarkContainer = document.getElementById("bookmark-container");
const detilesContainer = document.getElementById("detiles-container");

let totalBtn = document.getElementById("total-btn");

let bookmarks = [];

// show category

const loadCategory = (id) => {
  fetch(`https://openapi.programming-hero.com/api/categories`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.categories)
      showCategory(data.categories);
    });
};

const showCategory = (category) => {
  category.forEach((cate) => {

    const div = document.createElement("div");
    div.innerHTML = `<div id="category-btn-${cate.id}" onclick="loadCard(${cate.id})" 
    class=" md:text-left text-center mt-3 hover:bg-[#15803d] p-2  
    rounded-lg w-full category-tree ">${cate.category_name
      }</div>`;
    categoryContainer.appendChild(div);
  });
};
//Category btn remove active class
const removeActive = () => {
  const categoryTree = document.querySelectorAll(".category-tree");
  categoryTree.forEach((btn) => btn.classList.remove("active"));
};
// Load card
const loadCard = (carded) => {
  fetch(`https://openapi.programming-hero.com/api/category/${carded}`)
    .then((res) => res.json())
    .then((data) => {
      removeActive()
      const categoryBtn = document.getElementById(`category-btn-${carded}`);

      categoryBtn.classList.add("active");


      showCard(data.plants);

    });

  showLoading();
};

const showCard = (cards) => {

  cardContainer.innerHTML = "";
  cards.forEach((card) => {

    const creatDiv = document.createElement("div");
    creatDiv.innerHTML = `<div class=" shadow-md h-[550px] mt-2  p-4 rounded-lg bg-white ">
    <img class=" w-full h-[50%] rounded-xl text-[#1f2937] " src="${card.image}" alt="">
    <h1 onclick="loadPalantDetiles(${card.id})" class="font-bold mt-2 ">${card.name}</h1>
    <p class="mt-3">${card.description}</p>
    <div class="flex justify-between items-center">
        <button class="btn bg-[#DCFCE7] text-[#15803D] rounded-2xl mt-3">${card.category}</button>
    <p id="price" class="font-bold">৳<span>${card.price}</span></p>
    </div>
    <button class="addToCartBtn btn w-full rounded-2xl bg-green-600 text-white mt-8">Add to Cart</button>
  </div>`;
    cardContainer.appendChild(creatDiv);
  });
};


