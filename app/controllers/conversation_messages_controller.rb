require "tempfile"
require "json"

class ConversationMessagesController < ApplicationController
  def clear
    session[:conversation_context] = nil

    render json: { message: "Conversation context cleared" }
  end

  def create
    conversation = Conversation.find(params[:conversation_id])

    # Convert conversational context to an easy to use format
    conversational_context = conversation.messages.map { |message| { role: message.role, content: message.content } }

    # Convert audio data to text
    text = Sublayer::Actions::SpeechToTextAction.new(params[:audio_data]).call
    conversation.messages << Message.new(conversation: conversation, role: "user", content: text)

    # Generate conversational response
    # TODO: turn this "response" into a translation somehow
    # output_text = Sublayer::Generators::ConversationalResponseGenerator.new(conversation_context: conversational_context, latest_request: text).generate
    # conversation.messages << Message.new(conversation: conversation, role: "assistant", content: output_text)

    # TODO: this should have some better handling
    conversation.save!

    # push the conversations to the client with hotwire
    render turbo_stream: turbo_stream.replace("conversation-messages", partial: "conversations/messages", locals: { conversation: conversation })
  end
end
