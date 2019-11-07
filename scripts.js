            function KtoF(KelvinTemp){
              return (1.8*(KelvinTemp-273.15) + 32).toFixed(1);
            }

            function KtoC(KelvinTemp){
              return (KelvinTemp - 273.15).toFixed(1);
            }

            function toTitleCase( str ) {
              return str.split(/\s+/).map( s => s.charAt( 0 ).toUpperCase() + s.substring(1).toLowerCase() ).join( " " );
            }

            function formatResponse(weatherInfo){
              var formattedResponse = 'Here is the weather in ' + weatherInfo['name'] + '!\n\n\n';

              formattedResponse += 'Forecast: ' + weatherInfo['weather'][0].main + '\n';

              formattedResponse += 'Description: ' + toTitleCase(weatherInfo['weather'][0].description) + '\n';

              var temp = weatherInfo['main'].temp;

              formattedResponse += 'Temperature: ' + KtoF(temp) + 'F, ' + KtoC(temp)  + 'C\n';

              return formattedResponse;
            }

            async function getWeatherAPIData(ZIPCode, countryCode){
              var request = new XMLHttpRequest();
              request.open('POST', '/weather', false);
              request.setRequestHeader("Content-Type", "application/json");
              request.onload = async res => {

                    var response = res.target.response;

                    if (response.search("Error") == -1){
                      var weatherInfo = JSON.parse(response);
                      var formattedResponse = formatResponse(weatherInfo);
                      alert(formattedResponse);
                    }

                    else{
                      alert(response);
                    }
                    
                }

              const params = {'ZIPCode':ZIPCode,'countryCode':countryCode};
              request.send(JSON.stringify(params));
            }