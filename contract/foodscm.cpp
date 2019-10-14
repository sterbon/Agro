#include <eosio/eosio.hpp>

using namespace std;
using namespace eosio;

class [[eosio::contract]] foodscm : public eosio::contract {
  private:

    struct [[eosio::table]] cropdetails {
        name customer;
        string imageHash;
        string cropName;
        uint64_t cropAmount;
        
        auto primary_key()const { return customer.value;}
    };
    
    struct [[eosio::table]] userdata 
    {
      name customer;
      string accType;
      uint64_t tokenBalance;
      
      auto primary_key()const { return customer.value;}
    };
    
    typedef eosio::multi_index<name("cropdetails"), cropdetails> crop_data;
    typedef eosio::multi_index<name("userdata"), userdata> user_data;  
  
    crop_data _cropdata;
    user_data _userdata;
  
  public:
    using contract::contract;

    foodscm( name receiver, name code, datastream<const char*> ds ):
                                                  contract(receiver, code, ds),
                       _cropdata(receiver, receiver.value),
                       _userdata(receiver, receiver.value){}
    
    [[eosio::action]]
    void userdata(name customer, string accType, uint64_t tokenBalance) {
      
      _userdata.emplace(_self, [&](auto& row){
        row.customer = customer;
        row.accType = accType;
        row.tokenBalance = tokenBalance;
      });
    }
                       
    [[eosio::action]]
    void uploadcrop(name customer, string cropName, uint64_t cropAmount, 
                                                            string imageHash) {
        _cropdata.emplace(_self, [&](auto& row) {
            row.customer = customer;
            row.cropName = cropName;
            row.cropAmount = cropAmount;
            row.imageHash = imageHash;
        }); 
    }
    
    [[eosio::action]]
    void buycrop(name farmer, name buyer) {
      //Transfer tokens
      //Transfer volume
    }
};



