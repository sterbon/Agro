#include <eosio/asset.hpp>
#include <eosio/eosio.hpp>

using namespace std;
using namespace eosio;

class [[eosio::contract]] foodscm : public eosio::contract {
  private:

    struct [[eosio::table]] cropdetails {
        uint64_t productId;
        name producer;
        name buyer;
        string imageHash;
        string cropName;
        uint64_t cropAmount;
        uint64_t price;
        bool sold;
        
        auto primary_key()const { return productId;}
    };
    
    struct [[eosio::table]] userdata {
      name customer;
      string accType;
      uint64_t tokenBalance;

      auto primary_key()const { return customer.value;}
    };
    
    typedef eosio::multi_index<name("cropsdetail"), cropdetails> crop_data;
    typedef eosio::multi_index<name("userdata"), userdata> user_data;  
  
    crop_data _cropdata;
    user_data _userdata;
  
  public:
    using contract::contract;

    foodscm( name receiver, name code, datastream<const char*> ds ): contract(receiver, code, ds),
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
    void uploadcrop(name producer, string cropName, uint64_t cropAmount, string imageHash, uint64_t price) {

      _cropdata.emplace(_self, [&](auto& row) {
          row.productId = _cropdata.available_primary_key();
          row.producer = producer;
          row.cropName = cropName;
          row.cropAmount = cropAmount;
          row.imageHash = imageHash;
          row.price = price;
          row.sold = false;
          row.buyer = producer;
      }); 
    }
    
    [[eosio::action]]
    void buycrop(name buyer, uint64_t cropPid, asset quantity, string memo) 
    {
        auto itr = _cropdata.find(cropPid);
        name seller = itr->producer;

        struct transfer
        {
            name buyer;
            name seller;
            asset quantity;
            string memo;
        };

        eosio::action transfer_action = eosio::action(
            permission_level(_self, name("active")),
            name("eosio.token"), 
            name("transfer"),
            transfer{buyer, seller, quantity, memo});
            transfer_action.send();
        
        auto payer = has_auth( seller ) ? seller : buyer;
        _cropdata.modify(itr, payer, [&](auto& row){
          row.sold = true;
          row.buyer = buyer;
        });
    }
   /* void buycrop(name buyer, uint64_t cropPid) {
      
      auto itr = _cropdata.find(cropPid);
      name seller = itr->producer;
      uint64_t cropAmount = itr->cropAmount;
      
      //transfer tokens to cropPid.customer 
      check( buyer != seller, "cannot transfer to self" );
      require_auth( buyer );
      check( is_account( seller ), "to account does not exist");
      
      require_recipient( buyer );
      require_recipient( seller );
          
      auto payer = has_auth( seller ) ? seller : buyer;

    //  sub_balance( buyer, cropAmount );
    //  add_balance( seller, cropAmount, payer );
      
        
      }*/

};


