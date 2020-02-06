const allHotels = [];
const temphotels = [];
const pricefilter = [];
var index = 1;
jQuery(function ($) {

    $.ajax({
        url: "data.json",
        success: handleRequest
    });

    function handleRequest(hotelsData) {
        let currentHotels = hotelsData[1].entries;

        roomSelection(hotelsData);

        $("#modalBody").append(`<iframe  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d83998.94722687619!2d2.277019841665155!3d48.8588377391234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sgr!4v1554987763683!5m2!1sen!2sgr" width="450" height="450" SameSite=None frameborder="0" style="border:0"></iframe>`)


        let cities = [];
        for (let i = 0; i < hotelsData[1].entries.length; i++) {
            let temp = hotelsData[1].entries[i].city
            if (!cities.includes(temp)) {
                $("#hotel-cities").append('"<option value="' + temp + '"></option>"')
                // document.getElementById("demo").setAttribute("value", hotelsData[1].entries[i].city);
                cities.push(temp);

                $("#citySelect").append(`<option value="${temp}"> ${temp}</option>`);
            }
            let hotel = hotelsData[1].entries[i];

            const templ = renderHotel(hotel, index);
            allHotels.push(hotel);

            index++
            $("#hotels").append(templ)
            qualityOfLocation(allHotels)
            // $("#hotels").html(templ)
        }
    }








});
jQuery();
var start = document.getElementById('start');
var end = document.getElementById('end');




end.addEventListener('change', function () {
    if (end.value) {
        start.max = end.value;

    }


}, false);
start.addEventListener('change', function () {
    if (start.value)
        end.min = start.value;
}, false);


$("#pricerange").on("input", (e) => {
    document.getElementById("pricevalue").innerHTML = ' max:' + e.target.value + '';
});
$("#pricerange").on("change", (e) => {
    filterThing(allHotels);
});

function renderHotel(hotel, index) {


    return (
        `<div id="hotel${index}" class="hotel col-12 row ml-0 px-0">
    <div class="px-0 hotel-media col-3">
    <span id='clickableAwesomeFont'><i id="heart" class="iconHeartInactive fas fa-heart iconHeartInactive fa-2x"></i></span>
        <img src=${hotel.thumbnail}
            class="img-fluid" w-25 h-25 alt="">
            <span class="img-pagin bg-dark text-white p-1 rounded">1/30</span>
    </div>

    <div class="info col-4">
    <p id="hotelName${index}" class="hotelTitles">${hotel.hotelName}</p>
    <p id="star${index}">Hotel${getStars(hotel.rating)}</p>
    <p id="hotelCity${index}">${hotel.city}</p>
    
    <p id="rateNumber${index}"> </p>

    <p id="loc${index}"> </p>
    </div>
    <div class="deals col-2">
    <p id="hotelPriceId">Hotel website<br>$${hotel.price}</p>
    <p id="agodaPrice">Agoda<br>$${parseInt(getRandomArbitrary(hotel.price - 200, hotel.price + 200))}</p>
    <hr>
    <p id="moreDeals">More deals from <br> $${parseInt(getRandomArbitrary(hotel.price - 200, hotel.price + 200))}<span id="mid" class="fas fa-angle-down"></span></p>
    </div>
    <div class="deal col-3"><form>
    <p class="col" id="hotelWebsite"><br>Hotel Website <br><strong id="size">$${hotel.price}</strong><br>3 nights for $${parseInt(getRandomArbitrary((hotel.price * 3) - 350, (hotel.price * 3) - 100))} </p>
        <p class="col"><br><button id="viewDeals${index}" class="viewDeals justify-content-between col form-control"><strong id="textViewDeals">View Deals</strong> <i id="right" class="fas fa-angle-right"></i></button></p></form>
    </div>
    </div>`
    );
}



function getStars(stars) {
    let stringstars = ``;
    let count = 0;
    for (let i = 0; i < stars; i++) {
        count++;
        stringstars += `<span class="stars fa fa-star checked"></span>`
    }
    if (parseFloat(stars) === count + 0.5) {

        stringstars += ` <i class="set fas fa-star-half-alt"></i>`
    }
    for (let i = 0; i < 5 - stars; i++) {
        stringstars += `<span class="fa fa-star"></span>`
    }
    return stringstars;
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
function filterThing(allHotels) {
    $("#hotels").empty();
    for (let i = 0; i < allHotels.length; i++) {
        const temp = renderHotel(allHotels[i], i + 1);
        $("#hotels").append(temp);
    }
    let temp = document.getElementById("city-choice").value;
    let tempSelect = document.getElementById("typeSelect").value;
    let ratingSelect = document.getElementById("guestRating").value;
    let locSelect = document.getElementById("citySelect").value;
    let sortSel = document.getElementById("sortSelect").value;
    qualityOfLocation(allHotels)
    for (let i = 1; i < allHotels.length + 1; i++) {
        const city = document.getElementById("hotelCity" + i).innerHTML;
        // City filter
        let num = 0;
        if (temp === city) {
        }

        else if (temp === "") {
        } else {
            $("#hotel" + i).remove();
            num++;
        }
        // Price range filter
        if (parseFloat(allHotels[i - 1].price) >= document.getElementById("pricerange").value) {
            $("#hotel" + i).remove();
            num++;
        }
        // Star select filter
        let star = parseFloat(allHotels[i - 1].rating)

        if (tempSelect === "") {

        } else if (temp === "All") {

        } else if (tempSelect == star) {

        } else {
            $("#hotel" + i).remove();
            num++;
        }
        // Guest rating filter
        let str;
        let rating = parseFloat(allHotels[i - 1].ratings.no)
        if (rating < 2) {
            str = "0-2";
        }
        else if (temp === "All") {

        } else if (rating < 6) {
            str = "2-6"
        } else if (rating < 7) {
            str = "6-7"
        } else if (rating < 8.5) {
            str = "7-8.5";
        } else if (rating <= 10) {
            str = "8.5-10";
        }
        if (ratingSelect === "") {

        } else if (ratingSelect == str) {

        } else {
            $("#hotel" + i).remove();
            num++;
        }

        //  City location Filter

        if (locSelect === "") {

        } else if (temp === "All") {

        }
        else if (locSelect == city) {

        } else {
            $("#hotel" + i).remove();
            num++;
        }

        // Sort Selection filter
        let filters = allHotels[i - 1].filters;
        let j = 0
        let bool = true;

        while (bool && j < filters.length) {
            if (filters[j].name.toUpperCase() == sortSel.toUpperCase()) {
                bool = false;
            }
            j++;
        }

        if (!bool) {

        } else if (sortSel.toUpperCase() === "Our recommendations".toUpperCase()) {

        } else if (sortSel.toUpperCase() === "".toUpperCase()) {

        }
        else {
            $("#hotel" + i).remove();
            num++;
        }
    }


}

function roomSelection(hotels) {

    for (let i = 0; i < hotels[0].roomtypes.length; i++) {
        if (i === 0) {
            $("#roomSelect").append(`<option value="${hotels[0].roomtypes[i].name}">&#xf007; ${hotels[0].roomtypes[i].name}</option>`);
        } else {
            $("#roomSelect").append(`<option value="${hotels[0].roomtypes[i].name}">&#xf0c0; ${hotels[0].roomtypes[i].name}</option>`);
        }
    }
}

function qualityOfLocation(allHotels) {

    for (let i = 0; i < allHotels.length; i++) {

        let temp = allHotels[i].ratings.no;

        if (temp < 2) {
            $("#loc" + i).innerHTML(`Okay location (${parseFloat(temp).toFixed(1)}`)
            document.getElementById("rateNumber" + (i + 1)).innerHTML = `<span class="rateSpan">${parseFloat(temp).toFixed(1)}</span>Okay (<a href="#">${Math.floor(Math.random() * Math.floor(1500))} reviews</a> )`;
        } else if (temp < 6) {
            $("#loc" + i).innerHTML(`Fair location (${parseFloat(temp).toFixed(1)}`)
            document.getElementById("rateNumber" + (i + 1)).innerHTML = `<span class="rateSpan">${parseFloat(temp).toFixed(1)}</span>Fair (<a href="#">${Math.floor(Math.random() * Math.floor(1500))} reviews</a> )`;
        }
        else if (temp < 7) {
            $("#loc" + i).innerHTML(`Good location (${parseFloat(temp).toFixed(1)}`)
            document.getElementById("rateNumber" + (i + 1)).innerHTML = `<span class="rateSpan">${parseFloat(temp).toFixed(1)}</span>Good (<a href="#">${Math.floor(Math.random() * Math.floor(1500))} reviews</a> )`;
        }
        else if (temp < 8.5) {
            $("#loc" + i).innerHTML(`Very Good location (${parseFloat(temp).toFixed(1)}`)
            document.getElementById("rateNumber" + (i + 1)).innerHTML = `<span class="rateSpan">${parseFloat(temp).toFixed(1)}</span>Very Good (<a href="#">${Math.floor(Math.random() * Math.floor(1500))} reviews</a> )`;
        }
        else if (temp <= 10) {

            document.getElementById("loc" + (i + 1)).innerHTML = `Excellent location (${parseFloat(temp).toFixed(1)}/ 10)`
            document.getElementById("rateNumber" + (i + 1)).innerHTML = `<span class="rateSpan">${parseFloat(temp).toFixed(1)}</span>Excellent (<a href="#">${Math.floor(Math.random() * Math.floor(1500))} reviews</a> )`;

        }
    }
}

$('#typeSelect').on('change', function () {
    filterThing(allHotels);

});
$('#guestRating').on('change', function () {
    filterThing(allHotels);
});
$('#citySelect').on('change', function () {
    filterThing(allHotels);
});
$('#sortSelect').on('change', function () {
    filterThing(allHotels);
});

$("#searchbtn").click(function (e) {
    e.preventDefault();
    filterThing(allHotels);
})

$("#heart").click(function () {
    if ($(this).hasClass('iconHeartActive')) {
        $(this).removeClass("iconHeartActive");
        $(this).addClass("iconHeartInactive");
    } else {
        $(this).removeClass("iconHeartInactive");
        $(this).addClass("iconHeartActive");
    }

})


