let currentPage = -1;
let draggedItem = null;

const judul = document.getElementById("title");
const soal = document.getElementById("soal");
const answer = document.getElementById("answer");
const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");
const button4 = document.getElementById("button4");
let rectangles = answer.querySelectorAll('.rectangle');
const originalRectangles = ["rectangle1", "rectangle2", "rectangle3", "rectangle4", "rectangle5"];

const rectangle1 = document.getElementById("rectangle1");
const rectangle2 = document.getElementById("rectangle2");
const rectangle3 = document.getElementById("rectangle3");
const rectangle4 = document.getElementById("rectangle4");
const rectangle5 = document.getElementById("rectangle5");

const page = [
    {
        name:"tutorial",
        judul:"Tutorial",
        recText: ["B","A", "E", "C", "D"],
        answer:["rectangle2","rectangle1", "rectangle4", "rectangle5", "rectangle3"],
        soal: "Silahkan pindahkan kotak sehingga terurut sesuai abjad. Klik tombol konfirmasi jika sudah yakin dengan jawabanmu."
    },
    {
        name:"soal1",
        judul:"Soal 1 dari 5",
        recText: ["mendatangi", "malas", "berjalan", "pagi", "berangkat"],
        answer:["rectangle1","rectangle4", "rectangle5", "rectangle2", "rectangle3"],
        soal: 'Lengkapi kalimat dalam paragraf berikut dengan mengurutkan jawabanmu sesuai nomor!\n\nMatahari sudah tinggi, namun Ani belum juga bangun dari tidurnya. Ibunya sudah berulang kali memanggil, tetapi Ani tetap tidak bergeming. Akhirnya, ibu (1)____ Ani ke kamarnya dan membangunkannya secara langsung. "Ani, sudah (2)____! Ayo cepat bangun dan bersiap-siap. Kamu harus (3)____ sekolah tepat waktu," kata ibu dengan nada tegas. Dengan (4)____, Ani bangkit dari tempat tidurnya dan (5)____ ke kamar mandi untuk mencuci muka.'
    },
    {
        name:"soal2",
        judul:"Soal 2 dari 5",
        recText: ["burung" ,"mendung", "suram", "beraktivitas", "terbangun"],
        answer:["rectangle3","rectangle2", "rectangle5", "rectangle1", "rectangle4"],
        soal: 'Lengkapi kalimat dalam paragraf berikut dengan mengurutkan jawabanmu sesuai nomor!\n\nPagi itu suasana terasa (1)____, berbeda dari biasanya. Langit (2)____ menyelimuti desa, membuat segala sesuatu tampak kelabu. Ani (3)____ lebih awal karena tidak bisa tidur nyenyak semalam. Di luar jendela, terdengar suara (4)____ berkicau, namun suasana tetap suram karena tak banyak orang yang (5)____ di pagi itu.'
    },
    {
        name:"soal3",
        judul:"Soal 3 dari 5",
        recText: ["analisis" ,"signifikan", "ambiguitas", "dipahami", "paradoks"],
        answer:["rectangle4","rectangle5", "rectangle2", "rectangle1", "rectangle3"],
        soal: 'Lengkapi kalimat dalam paragraf berikut dengan mengurutkan jawabanmu sesuai nomor!\n\nDalam diskusi mengenai perkembangan teknologi, sering kali muncul berbagai istilah yang tampak rumit dan sulit (1)___, salah satunya adalah konsep (2)___ dalam penerapan teknologi di berbagai sektor. Meski terlihat bertentangan, konsep ini sebenarnya memiliki makna yang lebih (3)___ jika ditinjau dari sudut pandang yang lebih luas. Untuk memahami hal ini secara mendalam, diperlukan (4)___ yang komprehensif agar tidak terjadi (5)___ dalam interpretasi.'
    },
    {
        name: "soal4",
        judul: "Soal 4 dari 5",
        recText: ["penerus", "suku", "hutan", "lapisan", "tradisi"],
        answer: ["rectangle2", "rectangle5", "rectangle1", "rectangle3", "rectangle4"],
        soal: `Indonesia adalah negara yang kaya akan ____(1) dan budaya. Keberagaman ini terlihat dari berbagai ____(2) yang ada di setiap daerah, mulai dari bahasa, tarian, hingga adat istiadat. Oleh karena itu, pelestarian budaya menjadi sangat penting agar generasi ____(3) dapat mengenal dan menghargai warisan nenek moyang. Selain itu, Indonesia juga memiliki kekayaan alam yang luar biasa, seperti gunung, pantai, dan ____(4) yang menjadi daya tarik wisatawan, baik domestik maupun mancanegara. Upaya pemerintah dalam menjaga dan mempromosikan potensi alam serta budaya harus didukung oleh seluruh ____(5) masyarakat.`
    },
    {
        name: "soal5",
        judul: "Soal 5 dari 5",
        recText: ["penting", "aktif", "proses", "kebijakan", "perubahan"],
        answer: ["rectangle5", "rectangle4", "rectangle3", "rectangle2", "rectangle1"],
        soal: 'Sistem pendidikan di Indonesia terus mengalami ____(1) untuk meningkatkan kualitasnya. Dalam beberapa tahun terakhir, pemerintah telah mengimplementasikan berbagai ____(2) guna menciptakan suasana belajar yang lebih efektif. Salah satu upaya tersebut adalah dengan menggunakan teknologi dalam ____(3) pendidikan. Hal ini diharapkan dapat membuat siswa lebih ____(4) dan termotivasi untuk belajar. Selain itu, keterlibatan orang tua dalam proses pendidikan juga sangat ____(5) untuk mendukung perkembangan anak.'
    },
    {
        name:"result",
        judul:"Selamat!",
        recText: ["GG","GG", "GG", "GG", "GG"],
        answer:["rectangle1","rectangle2", "rectangle3", "rectangle4", "rectangle5"],
        soal: "Selamat telah menyelesaikan seluruh soal sampai akhir! Speller White mengapresiasi kerja kerasmu dan memiliki harapan besar atas rencananya berkat dirimu.\n Sebarkan laman ini untuk menjangkau lebih banyak orang untuk membantu menjalankan rencana Speller White!"
    }
]

answer.style.display = "none";
button2.style.display= "none";
button3.style.display= "none";
button4.style.display= "none";

button1.onclick = nextPage;

rectangles.forEach(rectangle => {
    rectangle.addEventListener('dragstart', (e) => {
        draggedItem = rectangle;
        rectangle.style.opacity = '0.5';
    });

    rectangle.addEventListener('dragend', () => {
        draggedItem = null;
        rectangle.style.opacity = '';
    });

    rectangle.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    rectangle.addEventListener('drop', (e) => {
        e.preventDefault();

        if (draggedItem !== rectangle) {
            const allRectangles = Array.from(answer.children);
            const draggedIndex = allRectangles.indexOf(draggedItem);
            const dropIndex = allRectangles.indexOf(rectangle);

            if (draggedIndex < dropIndex) {
                rectangle.parentNode.insertBefore(draggedItem, rectangle.nextSibling);
            } else {
                rectangle.parentNode.insertBefore(draggedItem, rectangle);
            }
        }
    });

        // Mobile touch events
    rectangle.addEventListener('touchstart', (e) => {
        draggedItem = rectangle;
        rectangle.style.opacity = '0.5'; // Make it semi-transparent during touch
    });

    rectangle.addEventListener('touchmove', (e) => {
        e.preventDefault(); // Prevent scrolling while dragging
        const touchLocation = e.targetTouches[0];
        // Move the dragged item with the finger
        rectangle.style.position = 'absolute';
        rectangle.style.left = `${touchLocation.pageX}px`;
        rectangle.style.top = `${touchLocation.pageY}px`;
    });

    rectangle.addEventListener('touchend', (e) => {
        rectangle.style.position = ''; // Reset the position
        rectangle.style.opacity = ''; // Reset opacity
        const allRectangles = Array.from(answer.children); // Get all rectangles
        const dropTarget = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY); // Element where the touch ended

        if (draggedItem !== dropTarget && dropTarget && dropTarget.classList.contains('rectangle')) {
            const dropIndex = allRectangles.indexOf(dropTarget); // Get the index of drop target
            const draggedIndex = allRectangles.indexOf(draggedItem); // Get the index of dragged item

            if (draggedIndex < dropIndex) {
                dropTarget.parentNode.insertBefore(draggedItem, dropTarget.nextSibling);
            } else {
                dropTarget.parentNode.insertBefore(draggedItem, dropTarget);
            }
        }
        draggedItem = null; // Clear the dragged item
    });

    // Mobile touch events
    rectangle.addEventListener('touchstart', (e) => {
        draggedItem = rectangle;
        rectangle.style.opacity = '0.5'; // Make it semi-transparent during touch
    });

    rectangle.addEventListener('touchmove', (e) => {
        e.preventDefault(); // Prevent default touch behavior (like scrolling)
        
        const touchLocation = e.targetTouches[0]; // Get the first touch point
        
        // Get half of the rectangle's dimensions (width and height)
        const offsetX = rectangle.offsetWidth / 2;
        const offsetY = rectangle.offsetHeight / 2;
    
        // Set the rectangle's position to ensure it's centered at the touch point
        rectangle.style.position = 'absolute';
        rectangle.style.left = `${touchLocation.pageX - offsetX}px`;
        rectangle.style.top = `${touchLocation.pageY - offsetY}px`;
    });

    rectangle.addEventListener('touchend', (e) => {
        rectangle.style.position = ''; // Reset the position
        rectangle.style.opacity = ''; // Reset opacity
        const allRectangles = Array.from(answer.children); // Get all rectangles
        const dropTarget = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY); // Element where the touch ended

        if (draggedItem !== dropTarget && dropTarget && dropTarget.classList.contains('rectangle')) {
            const dropIndex = allRectangles.indexOf(dropTarget); // Get the index of drop target
            const draggedIndex = allRectangles.indexOf(draggedItem); // Get the index of dragged item

            if (draggedIndex < dropIndex) {
                dropTarget.parentNode.insertBefore(draggedItem, dropTarget.nextSibling);
            } else {
                dropTarget.parentNode.insertBefore(draggedItem, dropTarget);
            }
        }
        draggedItem = null; // Clear the dragged item
    });
});

function nextPage(){
    currentPage++;
    resetList();
    if (currentPage===page.length-1){       
        answer.style.display = "none";
        button1.style.display = "none";
        button4.style.display = "none";
        button3.style.display = "none";
        button2.style.display = "block";
    }
    else{
        answer.style.display = "flex";
        button1.innerText = "Konfirmasi";
        button1.onclick = konfirmasi;
        button4.style.display = "block";
        button3.style.display = "block";
        button3.onclick = resetList;
        button4.onclick = hint;
    }
    judul.innerText = page[currentPage].judul;
    rectangle1.innerText = page[currentPage].recText[0];
    rectangle2.innerText = page[currentPage].recText[1];
    rectangle3.innerText = page[currentPage].recText[2];
    rectangle4.innerText = page[currentPage].recText[3];
    rectangle5.innerText = page[currentPage].recText[4];
}

function toggle(rec){
    if(rec.style.display === "none"){
        rec.style.display = "block";
    }
    else{
        rec.style.display = "none";
    }
}

function getAnswerSequence() {
    rectangles = answer.getElementsByClassName('rectangle'); // Get all <li> elements with class 'rectangle'

    let sequence = [];
    for (let i = 0; i < rectangles.length; i++) {
        sequence.push(rectangles[i].id);
    }
    return sequence;
}

function konfirmasi(){
    let input = getAnswerSequence();
    let benar = true ;
    for (let i=0;i<5;i++){
        if(input[i]!==page[currentPage].answer[i]){
            benar = false;
        }

    }
    if (benar){
        soal.innerText = page[currentPage].soal;
        soal.innerText += "\n\nJawabanmu benar! Silahkan klik tombol lanjut untuk pindah ke soal berikutnya.";
        button1.innerText = "Lanjut";
        button3.onclick = null;
        button4.onclick = null;
        button1.onclick = nextPage;
    }
    else if (!benar){  
        soal.innerText = page[currentPage].soal;
        soal.innerText+= "\n\nJawabanmu masih kurang tepat. Ayo kamu pasti bisa!";
        button1.onclick = konfirmasi;
    }
}

function resetList() {

    while (answer.firstChild) {
        answer.removeChild(answer.firstChild);
    }

    answer.appendChild(rectangle1);
    answer.appendChild(rectangle2);
    answer.appendChild(rectangle3);
    answer.appendChild(rectangle4);
    answer.appendChild(rectangle5);

    soal.innerText = page[currentPage].soal;
}

function hint(){
    let input = getAnswerSequence();
    let count = 0;
    for (let i=0;i<5;i++){
        if(input[i]===page[currentPage].answer[i]){
            count++;
        }
    }
    soal.innerText = page[currentPage].soal;
    soal.innerText += "\n\nHint: Sudah terdapat " + count + " jawaban yang sesuai.";
}

// for canvas
const canvas = document.getElementById('alphabetCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to window dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const letters = [];
const maxLetters = 100;

// Create Letter Object
function Letter(x, y, speed, char) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.char = char;

    this.draw = function () {
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)"; // Black text with 50% opacity
        ctx.font = "20px Arial";
        ctx.fillText(this.char, this.x, this.y);
    };

    this.update = function () {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.y = -20; // Move it back to the top
        }
        this.draw();
    };
}

// Generate random letters and push them into the letters array
for (let i = 0; i < maxLetters; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const speed = Math.random()*0.5 + 0.5; // Adjusted speed for slower movement (0.5 to 2.5)
    const char = alphabet[Math.floor(Math.random() * alphabet.length)];
    letters.push(new Letter(x, y, speed, char));
}

// Animate the letters
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < letters.length; i++) {
        letters[i].update();
    }
    requestAnimationFrame(animate);
}

animate();

// Adjust canvas size on window resize
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});








