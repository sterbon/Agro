#include <eosio/eosio.hpp>

using namespace std;
using namespace eosio;
class [[eosio::contract]] foodscm : public eosio::contract {

  private:

    struct [[eosio::table]] cropdata {
        uint64_t id;
        string crop_hash;
        
        auto primary_key()const { return crop_hash; }
    };

    typedef eosio::multi_index<name("cropdata"), cropdata> crop_data;

    crop_data _cropdata;

  public:

    foodscm( name receiver, name code, datastream<const char*> ds ):contract(receiver, code, ds),
                       _cropdata(receiver, receiver.value){}

    [[eosio::action]]
    void uploadcrop(string text_hash) {
      auto iter = _cropdata.find(crop_hash);
      
      if(iter == _cropdata.end()) {
        _cropdata.emplace(_self, [&] (auto& row) {
            row.id = _cropdata.available_primary_key();
            row.crop_hash = text_hash;
        });
      }
      
    }
    
    [[eosio::action]]
    void login(name user) {
      require_auth(user);
      
      
      
    }
};