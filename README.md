# done
* rails new and share the github

# now
* replicate voice recording from
https://github.com/sublayerapp/rails_llm_voice_chat_example/blob/main/lib/sublayer/actions/text_to_speech_action.rb
* https://github.com/sublayerapp/rails_llm_voice_chat_example/blob/main/app/views/conversations/show.html.erb should show all messages over hotwire

# next
* should we fork https://github.com/sublayerapp/rails_llm_voice_chat_example rather than recreate it?
  * changes needed
    * do not respond with an LLM call - maybe in v2 to summarize at the end
    * rather than record on button hold - record on button press and chunk it every 30 seconds with overlaps
  * rebuilding similar functionality
    * models
    * controllers
    * api calls


# soon




# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
