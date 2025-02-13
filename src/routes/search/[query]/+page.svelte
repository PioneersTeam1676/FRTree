<script>

    export let data;

    // console.log(data);

    import { onMount } from "svelte";

    /**
     * Returns a normalized value representing the similarity between two strings.
     * Used for searching and finding results for subreddit queries against the list.
     * @param {string} s1 The first string
     * @param {string} s2 The second string
     * @returns {number} The similarity, between 0.0 and 1.0
     */
    function similarity(s1, s2) {
        //if one contains the other, return 1
        if (s1.includes(s2) || s2.includes(s1)) {
            return 1.0;
        }

        var longer = s1;
        var shorter = s2;
        if (s1.length < s2.length) {
            longer = s2;
            shorter = s1;
        }
        var longerLength = longer.length;
        if (longerLength == 0) {
            return 1.0;
        }
        return (
            (longerLength - editDistance(longer, shorter)) /
            parseFloat(longerLength)
        );
    }

    /**
     * Levenshtein distance between two strings. Helper function for `similarity(s1:string, s2:string)`.
     * @param {string} s1 The first string
     * @param {string} s2 The second string
     * @returns {number} The amount of edits between two strings. A non-negative integer.
     */
    function editDistance(s1, s2) {
        s1 = s1.toLowerCase();
        s2 = s2.toLowerCase();

        var costs = new Array();
        for (var i = 0; i <= s1.length; i++) {
            var lastValue = i;
            for (var j = 0; j <= s2.length; j++) {
                if (i == 0) costs[j] = j;
                else
                    if (j > 0) {
                        var newValue = costs[j - 1];
                        if (s1.charAt(i - 1) != s2.charAt(j - 1))
                            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                        costs[j - 1] = lastValue;
                        lastValue = newValue;
                    }

            }
            if (i > 0) costs[s2.length] = lastValue;
        }
        return costs[s2.length];
    }

    //pare the data so that it only includes items that are similar to the query
    let query = data.query;
    console.log(query);
    
    console.log(data.data.info);//

    // let newData = [];

    let similarityValue = 0;
    let newData = data.data.info.filter((item) => {
        similarityValue = similarity(JSON.stringify(item.team_num + item.description), query);
        console.log(similarityValue);
        return similarityValue > 0.5;
    });
    




</script>

Results:
<!-- 

    write the code for each search result inside the each block

    {item.team_num} = team number
    {item.description} = team description (like "pascack pi-oneers")
    {item.pfp} = team profile picture url



-->
{#each newData as item}
    <a href="/{item.team_num}">
        <div class="search-result">
            <h1>{item.team_num}</h1>
        </div>
        <h6>{item.description}</h6>
    </a>
{/each}

