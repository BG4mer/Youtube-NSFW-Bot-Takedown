function generateEmail() {
    const link = document.getElementById("channelLink").value.trim();
    const location = document.getElementById("location").value;
    const output = document.getElementById("output");

    if (!link) {
        output.value = "Please enter a YouTube channel link.";
        return;
    }

    output.value =
`Hello YouTube Trust & Safety Team,

I’m reporting a YouTube channel that appears to be a bot account promoting adult content indirectly through its subscriptions and profile presentation.

Channel link:
${link}

Where it was encountered:
${location}

The account appears to engage in behavior that exposes inappropriate material to the general YouTube audience, including minors. This content does not seem to align with YouTube’s Community Guidelines, especially regarding child safety and spam or deceptive practices.

I’m asking that this channel be reviewed and appropriate action taken if it is found to be in violation of platform rules.

Thank you for your time and attention to this matter.

Sincerely,
A concerned user`;
}

function copyEmail() {
    const output = document.getElementById("output");
    output.select();
    document.execCommand("copy");
}
