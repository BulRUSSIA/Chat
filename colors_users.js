

async function fetch_colors()  {



    const url = 'http://185.231.154.198:5000/usersinroom/5c9a5ff00a975a14c67bc739';

    try {


        let colors = [

        ];


        let response = await fetch(url);
        let responseJsonData = await response.json();
        let colors_user = responseJsonData.data;


        return colors
    } catch (e) {
        console.log(e)
    }
}

export default fetch_colors();
export default colors
