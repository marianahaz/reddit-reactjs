const elapsed = (posted) => {
    let current = Math.floor(new Date().getTime()/1000.0);
    let elapsed = current - posted;

    // return elapsed;
    if (elapsed < 60) {
        return elapsed + 's';
    }
    else if (elapsed < 3600) {
        return (Math.round(elapsed /60) + 'min');
    }
    else if (elapsed <= 86400) {
        return (Math.round(elapsed / 3600) + 'h')
    }
    else {
        return (Math.round(elapsed / 86400) + ' dias')
    }
}

const handleImage = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].thumb === 'self') {
          arr[i].thumb = 'https://styles.redditmedia.com/t5_2zldd/styles/communityIcon_fbblpo38vy941.png?width=256&s=13a87a036836ce95570a76feb53f27e61717ad1b'
        }
      }
}

const activeButton = (id) => {
    const currentActive = document.querySelector('.activeButton'); 
    currentActive.classList.remove('activeButton');
    
    const newActive = document.querySelector('#' + id);
    newActive.classList.add('activeButton');
}


const showPosts = () => {
    let shown = 10;
    const allPosts = document.querySelector('.allPosts').children;
    const verMais = document.querySelector('#verMais');
    const sortButton = document.querySelectorAll('header > button');

    if (allPosts.length > 10) {
       for (let i = shown; i < allPosts.length; i++) {
           allPosts[i].classList.add('hide');
       }
    }

    for (let i=0; i<sortButton.length;i++) {
        sortButton[i].addEventListener('click', () => {
            shown = 10;
        })
    }
    
    verMais.addEventListener('click', () => {
        
        let currentHeight = window.pageYOffset;        
        
        if (shown + 10 >= allPosts.length) {
            for (let i = 0; i < allPosts.length; i++) {
                allPosts[i].classList.remove('hide');
            }
            verMais.classList.add('hide');   
        } else {
            for (let i = shown; i < shown + 10; i++) {
                allPosts[i].classList.remove('hide');
            }
            shown += 10;
        }
        
        window.scrollTo(0, currentHeight);
    })
}

const resetShowMore = () => {
    const verMais = document.querySelector('#verMais');
    verMais.classList.remove('hide');
}


export { 
    elapsed,
    handleImage,
    showPosts,
    activeButton,
    resetShowMore
}