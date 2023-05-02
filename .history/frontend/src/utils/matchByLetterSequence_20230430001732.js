export const matchByLetterSequence =(users, searchLetters)=> {
    const matches = [];
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const nameScore = matchScore(user.UserName, searchLetters);
      const surnameScore = matchScore(user.UserSurname, searchLetters);
      const emailScore = matchScore(user.UserKNumber, searchLetters);
      const score = Math.max(nameScore, surnameScore, emailScore);
      if (score > 0) {
        matches.push(user);
      }
    }
    return matches;
  }
  
const matchScore =(string, searchLetters)=> {
    let score = 0;
    let idx = 0;
    for (let i = 0; i < searchLetters.length; i++) {
      const letter = searchLetters[i].toLowerCase();
      const nextIdx = string.toLowerCase().indexOf(letter, idx);
      if (nextIdx === -1) {
        score = 0;
        break;
      }
      score += nextIdx - idx + 1;
      idx = nextIdx + 1;
    }
    return score;
  }