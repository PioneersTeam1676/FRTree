<script>
    let {children} = $props();
</script>

<div class="header">
    <img class="logo-img" src="src/LinkTreeLogo-02.png" alt="logo">
    <button class="gallery-btn">Gallery</button>
    <div class="button-container">
        <button class="btn">Sign Up</button>
        <button class="btn">Sign In</button>
        <img class="header-pfp" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fyt3.ggpht.com%2Fa%2FAGF-l7-mM82_wzV3-rb20GXvq8nDm-8dFzEYPBY9%3Ds900-c-k-c0xffffffff-no-rj-mo&f=1&nofb=1&ipt=258c65eef72ceda28dcc447625cfa9c935e781108d34fd1d1affe361e8c6aa90&ipo=images" alt="profile pic">
    </div>
</div>

{@render children()}

<style>
    .header {
    display: flex;
    align-items: center;    /* Center vertically */
    width: 100vw;
    height: 10vh;
    background-color: rgb(216, 196, 171);
}

.logo-img{
    margin-left: .7vw;
    height: 60px;
}

.button-container {
    display: flex; /* Use flexbox for the button container */
    align-items: center; /* Center buttons vertically */
    margin-left: auto; /* Push the button container to the right */
}


.btn {
    margin-right: 1vw; /* Space between buttons */
    padding: 10px 15px; /* Button padding */
    background-color: #fff; /* Button background color */
    border: none; /* Remove default border */
    border-radius: 5px; /* Rounded corners */
    cursor: pointer; /* Pointer cursor on hover */
    transition: background-color 0.3s ease; /* Smooth transition for background color */
}

.btn:hover {
    background-color: #3E7B27; /* Change background color on hover */
    color: white; /* Change text color on hover (optional) */
}

.btn:active {
    background-color: #234716; /* Change background color on click */
}

.header-pfp {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    margin-right: 1vw;
}

.gallery-btn {
    margin-left: 1vw; /* Space between buttons */
    padding: 10px 15px; /* Button padding */
    background-color: #fff; /* Button background color */
    border: none; /* Remove default border */
    border-radius: 5px; /* Rounded corners */
    cursor: pointer; /* Pointer cursor on hover */
    transition: background-color 0.3s ease; /* Smooth transition for background color */
}

.gallery-btn:hover{
    background-color: #3E7B27; /* Change background color on hover */
    color: white; /* Change text color on hover (optional) */
}

.gallery-btn:active{
    background-color: #234716; /* Change background color on click */
}

</style>