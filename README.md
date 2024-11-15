# done
* rails new and share the github
* replicate voice recording from
https://github.com/sublayerapp/rails_llm_voice_chat_example/blob/main/lib/sublayer/actions/text_to_speech_action.rb
* https://github.com/sublayerapp/rails_llm_voice_chat_example/blob/main/app/views/conversations/show.html.erb should show all messages over hotwire
* should we fork https://github.com/sublayerapp/rails_llm_voice_chat_example rather than recreate it?
  * rebuilding similar functionality
    * models
    * controllers
    * api calls
* fix github remote branch mismatch
* do not respond with an LLM call - maybe in v2 to summarize at the end

# now
* current recording test is totally off base - maybe whisper isn't good with accents?
* rather than record on button hold - record on button press and stop on press again - confirm
* chunk it every 30 seconds with overlaps

# next
* check out podcast buddy - https://github.com/codenamev/podcast-buddy/blob/main/README.md
* https://mdn.github.io/dom-examples/media/web-dictaphone/


# soon
* deploy somewhere so it can be shared
  * probably just heroku, mabye someone can help with kamal
* will words clip?


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
