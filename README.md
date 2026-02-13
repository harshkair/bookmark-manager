Basic deployment steps: 
1.Setup supabase credentials
2. Setup Google OAuth credentials
3. Install dependencies
4. Npm run dev

Major problems encountered: 
1 Learning Supabase credentials:
Supabase is a very new software for me which posed a challenge. I went through the documentation to understand what new features are offered by supabase. Apart from the basic storage capabalities, I learned the realtime updation feature which is exactly what the project's demands were. Apart from that, integrating google auth was very easy as all I had to do was get the client id and secret and input them and voila. Moreover, the sql editor is very easy to use and feature rich. While it seemed like a challenge at first, thoroughly reading through the documentation and the help of a few ai tools allowed me to easily navigate this challenge.
2 Real time updation:
Initally when I learnt about the replication feature in Supabase I was excited to implement it as it immediately solved the challenge that was posed but I later learned that the replication feature is only accessible by 'Alpha' users. That left me disheartened and I ventured out to find more solutions. The obvious solution was to introduce recurring polling every 3 seconds. That immediately solved the real time updation issue. It polled the backend every 3 seconds for new bookmarks and added them to the list and used optimistic deletion for real time updates. 

All in all, creating this project helped me refresh my jsx and tsx skills and got the creative juices flowing. I hope that the project is upto your expectations.