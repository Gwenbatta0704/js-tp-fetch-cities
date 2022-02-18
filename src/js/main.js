(function (){
    const usaVille={
        init(){
            this.endpoint="https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
            this.cities =[];
            this.searchForm= document.querySelector('.search-form');
            this.eUlsuggest = document.querySelector('.suggestions')
            if (window.fetch){
                fetch(this.endpoint)
                    .then(response =>  {
                        if (response.status === 200){
                            response.json().then(responseJSON =>{
                                this.cities.push(...responseJSON);
                                console.log(this.cities);
                                //cities = responseJSON
                            });
                            //console.log(reponse);
                        }else{
                            console.log(`Oups! ${response.status}`)
                        }
                    }).catch(errors=>{
                    console.log(`Aie! ${errors}`);
                });
            }else{


            }

            function findMatches(wordToMatch){
                //console.log(wordToMatch);
                return this.cities.filter(place=>{
                    //console.log(place);
                    const regex = new RegExp(wordToMatch,'gi');
                    return place.city.match(regex) || place.state.match(regex);
                });
            }
            function numberWithSpace(x) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            }
            function displayMatches(wordToMatch) {
                this.eUlsuggest.innerHTML = findMatches(wordToMatch).map(item => {
                    const regex = new RegExp(wordToMatch, 'gi');
                    return `<li>
        <span class="name">${item.city.replace(regex, `<span class="hl">${wordToMatch}</span>`)},${item.state.replace(regex, `<span class="hl">${wordToMatch}</span>`)}</span>
        <span class="population">${numberWithSpace(item.population)}</span>
</li>`;
                }).join('');
                if (wordToMatch.value===''){
                    this.eUlsuggest.innerHTML=`<li>Filtrer pour une ville</li> <li>Ou un état</li>`;
                }
            }

            this.searchForm.addEventListener('submit', (e)=>{
                e.preventDefault();
            })
            this.searchForm.querySelector('#search').addEventListener('keyup', (event)=>{
                //console.log(event.currentTarget.value);
                displayMatches(event.currentTarget.value);
            })
        }
    }
    usaVille.init()
})();



